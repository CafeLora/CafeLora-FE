<template>
  <confirmation-modal
    :error="null"

    :title="modalTitle"

    @cancel="closeModal"
  ></confirmation-modal>
  <modal
    :show="!!message"
    :title="message"
    @close="handleError"
    :error="error"
    :loading="loading"
  ></modal>
  <section id="main" :class="{ expand: expand }">
    <div>
      <h3 class="back" @click="goBack">
        <i class="fas fa-chevron-left"></i> Salir
      </h3>
    </div>
  <p>SELECCIONE EL SENSOR QUE DESEA VISUALIZAR</p>
 <select class="" name="selectsensor" v-model="seleccionado">
    <option value='multisensor'>multisensor</option>
    <option value="color" selected>color</option>
  </select>
    <br />
    <br />

  <div v-if="seleccionado=='multisensor'">
      <h2>LISTA DE SENSOR DE TEMPERATURA, HUMEDAD Y PH</h2>

      
    <grid
      :dataSource="dataSource"
      :columns="columns"
      :config="config"

      :rows="5"
      @movePage="movePage"
      @selectedList="selectedList"
    ></grid>
  </div>

  <div v-if="seleccionado=='color'">
      <h2>LISTA DE SENSOR DE COLOR</h2>
      
    <grid
      :dataSource="dataSourceColor"
      :columns="columnscolor"
      :config="config"

      :rows="5"
      @movePage="movePageColor"
      @selectedList="selectedListColor"
    ></grid>
  </div>
      
  </section>
</template>

<script lang="ts">
import Grid from "@/components/ui/Grid.vue";
import ConfirmationModal from "@/components/ui/ConfirmationModal.vue";
import Modal from "../components/ui/Modal.vue";
import { BASE_URL} from "@/common/constants";
import { IUser } from "../interfaces/user.interface";
import { columnsRolListSensor, columnsRolListColor } from "../common/constants";
import { defineComponent } from "@vue/runtime-core";
import { IDataSource } from "../interfaces/dataSource";
import { emptyDataSource } from "../utils/initializer";
import { IUmbralMaxTemperatura} from "../interfaces/umbralMaxTemperatura.interface";

export default defineComponent({
  components: {
    Grid,
    ConfirmationModal,
    Modal,
  },
  data() {
    return {
      profileUrl: "",
      userRol: "",
      seleccionado:'multisensor' as string,
      seleccionadocolor:'color' as string,
      userInfoJson: null as unknown as IUser,
      dataSource: emptyDataSource() as IDataSource<IUser>,
      dataSourceColor: emptyDataSource() as IDataSource<IUser>,
      columns: columnsRolListSensor,
      columnscolor:columnsRolListColor,
      umbral: [] as IUmbralMaxTemperatura[],
      config: {

      },

      modalTitle: "",
      showModalConfirmation: false,
      id: "",
      message: null as unknown as string | null,
      loading: false,
      error: false,
      entityList: [] as string[],
      
      expand: false,
      page: 1,
      quantity: 5,
    };
  },
  methods: {
    movePage(pageNumber: number) {
      this.page = pageNumber;
      this.listUsersByRol();
    },
    movePageColor(pageNumber: number) {
      this.page = pageNumber;
      this.listUsersByRolColor();
    },
    expandMain(value: boolean): void {
      this.expand = !value;
    },
    selectedList(entityList: string[]): void {
      this.entityList = entityList;
    },
    selectedListColor(entityList: string[]): void {
      this.entityList = entityList;
    },
    handleError(): void {
      this.message = null;
    },
    closeModal(): void {
      this.showModalConfirmation = false;
    },
    calculateUser(): string {
      console.log(this.$route);
      switch (this.$route.path) {
        case "/dashboard/agricultores":
          this.userRol = "AGRICULTORES";
          this.profileUrl = "/dashboard/profile/agricultor/";
          break;
      }

      return this.userRol;
    },
    goBack(): void {
      this.$router.back();
    },
    async listUsersByRol(): Promise<void> {
      try {
        const response = await fetch(
          `${BASE_URL}devicesync/listado/${this.userRol}?page=${this.page}&quantity=${this.quantity}`,
          {
            method: "GET",
            headers: new Headers({
              "Content-Type": "application/json",
              Authorization: "Bearer " + localStorage.getItem("token"),
            }),
          }
        );

        this.dataSource = (await response.json()) as IDataSource<IUser>;
        console.log("this.dataSource");
        console.log("acaacacacacacacaca");
        console.log(this.dataSource);
      } catch (error) {
        console.log(error);
      }
    },
    async listUsersByRolColor(): Promise<void> {
      try {
        const response = await fetch(
          `${BASE_URL}device_color/listado/${this.userRol}?page=${this.page}&quantity=${this.quantity}`,
          {
            method: "GET",
            headers: new Headers({
              "Content-Type": "application/json",
              Authorization: "Bearer " + localStorage.getItem("token"),
            }),
          }
        );

        this.dataSourceColor = (await response.json()) as IDataSource<IUser>;
        console.log("this.dataSource");
        console.log("acaacacacacacacaca");
        console.log(this.dataSourceColor);
      } catch (error) {
        console.log(error);
      }
    },

    async fetchUmbral(): Promise<void> {
      try {
        const response = await fetch(`${BASE_URL}UmbralMaxTemperatura/lista/${this.userRol}`, {
          method: "GET",
          headers: new Headers({
            "Content-Type": "application/json",
            Authorization: "Bearer " + localStorage.getItem("token"),
          }),
        });
         this.umbral = (await response.json()) as IUmbralMaxTemperatura[];
         console.log("acaacacacacacacaca");
         console.log(this.umbral);
      } catch (err) {
        console.log(err);
      }
    },    

    register(): void {
      this.$router.push(this.profileUrl);
    },


  },
  mounted() {
    (async () => {
      try {
        const response = await fetch(`${BASE_URL}usuario`, {
          method: "GET",
          headers: new Headers({
            "Content-Type": "application/json",
            Authorization: "Bearer " + localStorage.getItem("token"),
          }),
        });

        const userInfo = (await response.json()) as IUser;

        this.userInfoJson = userInfo;
      } catch (error) {
        console.log(error);
      }
      await this.listUsersByRolColor();
      await this.listUsersByRol();
      
      await this.fetchUmbral();
      
      
    })();
  },
});
</script>

<style scoped>
.buttons {
  margin-top: 15px;
  margin-bottom: 5px;
  text-align: right;
}
.action-button {
  position: relative;
  width: 220px;
  margin-right: 15px;
}
.back {
  position: absolute;
  top: 100px;
  left: 260px;
  cursor: pointer;
}
@media (max-width : 1250px){
  .buttons {
  text-align: center;
}
}

</style>