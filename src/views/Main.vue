<template>
  <modal
    :show="!!message"
    :title="message"
  ></modal>
  <section>
    <section id="main">
      <h1 style="font-weight: 900 !important; font-size: xx-large">
        PANEL PRINCIPAL
      </h1>

      <div v-show="userInfoJson?.rol === 'Administrador'">
        <div class="gridCards adminGrid"> 
          
              <div class="card stat donut" style="height: 218.5px">
                 <img
                src="@/assets/images/Icon_GeneraPlan_Jefe.png"
                alt="Generar Plan Icono"
                width="130"
                height="130"
                @click="goTo('Agricultores')"
                
              /> 
              <div>
            
            <strong>TRABAJADORES</strong></div>
               
                
              </div>

        </div>
        
        <div class="gridCards adminGrid">
          <!-- <button @click="downloadPDF"></button> -->
          <div
            v-for="rol_action in rolUserActions"
            :key="rol_action.description"
            @click="goToList(rol_action.url)"
            class="card"
          >
            <img :src="rol_action.src" :alt="rol_action.src" class="image" />
            <p>{{ rol_action.description }}</p>
          </div>
        </div>
        <br />
        <br />
        <p>SELECCIONE EL UMBRAL QUE DESEA ACTUALIZAR</p>
 <select class="" name="selectxd" v-model="seleccionado">
    <option value='temperatura'>temperatura</option>
    <option value="humedad" selected>humedad</option>
    <option value="ph">ph</option>
    <option value='color'>color</option>
    </select>
    <br />
    <br />
    <div v-if="seleccionado=='temperatura'">
      <p>Umbral Temperatura Máximo</p>
        <input
          type="text"
          :placeholder="umbralMaxTempJson?.ultimo"
          v-model.trim="umbralMaxTempJson.ultimo"
        />

       <h1></h1>
      <button class="action-button" @click="submit()">
        {{ displayButtonText }}
      </button>
<br /><br />
      <div class="right-side">
        <p>Umbral Temperatura Mínimo</p>
        <input
          type="text"
          :placeholder="umbralMinTempJson?.ultimo"
          v-model.trim="umbralMinTempJson.ultimo"
        />
      <h1></h1>
        <button class="action-button" @click="submitMin()">
        {{ displayButtonText }}
      </button>
      </div>


    </div>



    <div v-if="seleccionado=='humedad'">
      <p>Umbral Humedad Máximo</p>
        <input
          type="text"
          :placeholder="umbralMaxHumedadJson?.ultimo"
          v-model.trim="umbralMaxHumedadJson.ultimo"
        />

       <h1></h1>
      <button class="action-button" @click="submitHumedadMax()">
        {{ displayButtonText }}
      </button>
<br /><br />
      <div class="right-side">
        <p>Umbral Humedad Mínimo</p>
        <input
          type="text"
          :placeholder="umbralMinHumedadJson?.ultimo"
          v-model.trim="umbralMinHumedadJson.ultimo"
        />
      <h1></h1>
        <button class="action-button" @click="submitHumedadMin()">
        {{ displayButtonText }}
      </button>
      </div>


    </div>



    <div v-if="seleccionado=='ph'">
      <p>Umbral PH Máximo</p>
        <input
          type="text"
          :placeholder="umbralMaxPhJson?.ultimo"
          v-model.trim="umbralMaxPhJson.ultimo"
        />

       <h1></h1>
      <button class="action-button" @click="submitPhMax()">
        {{ displayButtonText }}
      </button>
<br /><br />
      <div class="right-side">
        <p>Umbral PH Mínimo</p>
        <input
          type="text"
          :placeholder="umbralMinPhJson?.ultimo"
          v-model.trim="umbralMinPhJson.ultimo"
        />
      <h1></h1>
        <button class="action-button" @click="submitPhMin()">
        {{ displayButtonText }}
      </button>
      </div>


    </div>




    <div v-if="seleccionado=='color'">
      <p>Umbral Color Máximo</p>
        <input
          type="text"
          :placeholder="umbralMaxColorJson?.ultimo"
          v-model.trim="umbralMaxColorJson.ultimo"
        />

       <h1></h1>
      <button class="action-button" @click="submitColorMax()">
        {{ displayButtonText }}
      </button>
<br /><br />
      <div class="right-side">
        <p>Umbral Color Mínimo</p>
        <input
          type="text"
          :placeholder="umbralMinColorJson?.ultimo"
          v-model.trim="umbralMinColorJson.ultimo"
        />
      <h1></h1>
        <button class="action-button" @click="submitColorMin()">
        {{ displayButtonText }}
      </button>
      </div>


    </div>


   


      
      </div>





      <div v-show="userInfoJson?.rol === 'Administrador' || 'Agricultores'">
        <div class="container">
          <div class="row">
            <div class="col">
              <div class="mycard linegod" style="background-color: ghostwhite">
                <button
                  class="btn-table"
                  @click="goTo('ListasSensor')"
                >
                  VER HISTORIAL 
                  
                </button>
                 <br />
                  <br />
                <iframe title="entra(1)(1)(1)" width="1500" height="700" src="https://app.powerbi.com/reportEmbed?reportId=bab0ed1f-7abc-4373-8a9f-cd33191653e0&autoAuth=true&ctid=360bc517-7aac-4c17-9907-4c5f13a12289" frameborder="0" allowFullScreen="true"></iframe>
              </div>
            </div>
          </div>
        </div>
      </div>

    






   <!--aqui iba lo de agricultores-->




      

    </section>
  </section>
</template>

<script lang="ts">

import { defineComponent } from "@vue/runtime-core";
import ApexCharts from "apexcharts";
import {
  BASE_URL,
  rol,
} from "../common/constants";
import {

  configureLineChartOptions,

  configureTreeMapChartOptions,
  configureLineChartOptionsTemperatura,
  configureLineChartOptionsColor,
  configureLineChartOptionsPH,
} from "../common/graphics";
import {

  lineChartSeries,
  lineChartSeriesColor,
  lineChartSeriesTemperatura,
  lineChartSeriesPH,
  treeMapChartSeries,
} from "../common/mockdata";



import { IUser } from "../interfaces/user.interface";
import { getUsuario } from "../services/authService";
import { emptyUmbralMaxTemp, emptyUmbralMinTemp ,emptyUmbralMaxHumedad,emptyUmbralMinHumedad,emptyUmbralMaxPh,emptyUmbralMinPh,emptyUmbralMaxColor,emptyUmbralMinColor,emptyUser } from "../utils/initializer";
import { IUmbralMaxTemperatura} from "../interfaces/umbralMaxTemperatura.interface";
import { IUmbralMinTemperatura} from "../interfaces/umbralMinTemperatura.interface";
import { IUmbralMaxHumedad } from "@/interfaces/umbralMaxHumedad.interface";
import { IUmbralMinHumedad } from "@/interfaces/umbralMinHumedad.interface";
import { IUmbralMaxPh } from "@/interfaces/umbralMaxPh.interface";
import { IUmbralMinPh } from "@/interfaces/umbralMinPh.interface";
import { IUmbralMaxColor } from "@/interfaces/umbralMaxColor.interface";
import { IUmbralMinColor } from "@/interfaces/umbralMinColor.interface";
import Modal from "../components/ui/Modal.vue";



export default defineComponent({
  components: {
    Modal,
  },
  computed: {
    displayButtonText(): string {
      return "Guardar";
    },

  },
  data() {
    return {
      rolUserActions: [] as any,
      userInfoJson: emptyUser() as IUser,
      numberEvaluaciones: 3000,
      Objeto: [] as any,
      umbral: [] as IUmbralMaxTemperatura[],
      umbralMin: [] as IUmbralMinTemperatura[],
      umbralMaxHumedad: [] as IUmbralMaxHumedad[],
      umbralMinHumedad: [] as IUmbralMinHumedad[],
      umbralMaxPh: [] as IUmbralMaxPh[],
      UmbralMinPh: [] as IUmbralMinPh[],
      UmbralMaxColor: [] as IUmbralMaxColor[],
      UmbralMinColor: [] as IUmbralMinColor[],
      umbralMaxTempJson:emptyUmbralMaxTemp() as IUmbralMaxTemperatura,
      umbralMinTempJson:emptyUmbralMinTemp() as IUmbralMinTemperatura,
      umbralMaxHumedadJson:emptyUmbralMaxHumedad() as IUmbralMaxHumedad,
      umbralMinHumedadJson:emptyUmbralMinHumedad() as IUmbralMinHumedad,
      umbralMaxPhJson:emptyUmbralMaxPh() as IUmbralMaxPh,
      umbralMinPhJson:emptyUmbralMinPh() as IUmbralMinPh,
      umbralMaxColorJson:emptyUmbralMaxColor() as IUmbralMaxColor,
      umbralMinColorJson:emptyUmbralMinColor() as IUmbralMinColor,
      validationForm: {} as Partial<IUmbralMaxTemperatura>,
      formIsValid: true,
      selectrico:'',
      titleProfile:"", 
      seleccionado:'temperatura' as string,
      message: null as string | null,
    };
  },

  methods: {
    async downloadPDF(): Promise<void> {
      // works in local, but not in prod
      try {
        fetch(`${BASE_URL}evaluacion/informe/EV002`, {
          method: "GET",
          headers: new Headers({
            "Content-Type": "arraybuffer",
            Authorization: "Bearer " + localStorage.getItem("token"),
          }),
        })
          .then((response) => response.blob())
          .then((blob) => {
            var file = new Blob([blob], { type: "application/pdf" });
            var fileURL = URL.createObjectURL(file);
            window.open(fileURL);
          });
      } catch (err) {
        console.log(err);
      }
    },

    goTo(url: string, params: any): void {
      this.$router.push({ name: url, params: params });
    },


    calculateDashBoard() {
      switch (this.userInfoJson.rol) {
        case rol.ADMINISTRADOR:
         // this.rolUserActions = AdminUserActions;
          break;
      }
    },

    generarPlan() {
      this.$router.push("/plan-tratamiento");
    },


    async correitotemp(): Promise<void> {
      try {
        const response = await fetch(`https://iot-notification.azurewebsites.net/api/iot/init/temp/peker230598@hotmail.com`, {
          method: "GET",
        });
        await response.json();
         console.log("acaacacacacacacaca");
         console.log(this.umbral);
        console.log("AHORAAAAAA");

      } catch (err) {
        console.log(err);
      }
    }, 

    async correitohum(): Promise<void> {
      try {
        const response = await fetch(`https://iot-notification.azurewebsites.net/api/iot/init/hum/peker230598@hotmail.com`, {
          method: "GET",
        });
        await response.json();
         console.log("acaacacacacacacaca");
         console.log(this.umbral);
        console.log("AHORAAAAAA");

      } catch (err) {
        console.log(err);
      }
    }, 


    async correitoph(): Promise<void> {
      try {
        const response = await fetch(`https://iot-notification.azurewebsites.net/api/iot/init/ph/peker230598@hotmail.com`, {
          method: "GET",
        });
        await response.json();
         console.log("acaacacacacacacaca");
         console.log(this.umbral);
        console.log("AHORAAAAAA");

      } catch (err) {
        console.log(err);
      }
    }, 


    async correitocolor(): Promise<void> {
      try {
        const response = await fetch(`https://iot-notification.azurewebsites.net/api/iot/init/color/peker230598@hotmail.com`, {
          method: "GET",
        });
        await response.json();
         console.log("acaacacacacacacaca");
         console.log(this.umbral);
        console.log("AHORAAAAAA");

      } catch (err) {
        console.log(err);
      }
    }, 


    async fetchUmbral(): Promise<void> {
     
      try {
        const response = await fetch(`${BASE_URL}UmbralMaxTemperatura/lista`, {
          method: "GET",
          headers: new Headers({
            "Content-Type": "application/json",
            Authorization: "Bearer " + localStorage.getItem("token"),
          }),
        });
         this.umbral = (await response.json()) as IUmbralMaxTemperatura[];
         console.log("acaacacacacacacaca");
         console.log(this.umbral);
        console.log("AHORAAAAAA");
      } catch (err) {
        console.log(err);
      }
    }, 
  
    async fetchUmbralMinimo(): Promise<void> {
      try {
        const response = await fetch(`${BASE_URL}UmbralMinTemperatura/lista`, {
          method: "GET",
          headers: new Headers({
            "Content-Type": "application/json",
            Authorization: "Bearer " + localStorage.getItem("token"),
          }),
        });
         this.umbralMin = (await response.json()) as IUmbralMinTemperatura[];
         console.log("ACAAAAAAAAA MINIMOOOOOOOOOOOOOO");
         console.log(this.umbralMin);
        console.log("AHORAAAAAA");

      } catch (err) {
        console.log(err);
      }
    },     

    async fetchUmbralHumedadMax(): Promise<void> {
      try {
        const response = await fetch(`${BASE_URL}UmbralMaxHumedad/lista`, {
          method: "GET",
          headers: new Headers({
            "Content-Type": "application/json",
            Authorization: "Bearer " + localStorage.getItem("token"),
          }),
        });
         this.umbralMaxHumedad = (await response.json()) as IUmbralMaxHumedad[];
         console.log("ACAAAAAAAAA MAXIMO DE HUMEDAAAAAAAAAAAAD");
         console.log(this.umbralMaxHumedad);

      } catch (err) {
        console.log(err);
      }
    }, 
    
    async fetchUmbralHumedadMin(): Promise<void> {
      try {
        const response = await fetch(`${BASE_URL}UmbralMinHumedad/lista`, {
          method: "GET",
          headers: new Headers({
            "Content-Type": "application/json",
            Authorization: "Bearer " + localStorage.getItem("token"),
          }),
        });
         this.umbralMinHumedad = (await response.json()) as IUmbralMinHumedad[];
         console.log("ACAAAAAAAAA MINIMO DE HUMEDAAAAAAAAAAAAD");
         console.log(this.umbralMinHumedad);

      } catch (err) {
        console.log(err);
      }
    }, 
    
    async fetchUmbralPhMax(): Promise<void> {
      try {
        const response = await fetch(`${BASE_URL}UmbralMaxPh/lista`, {
          method: "GET",
          headers: new Headers({
            "Content-Type": "application/json",
            Authorization: "Bearer " + localStorage.getItem("token"),
          }),
        });
         this.umbralMaxPh = (await response.json()) as IUmbralMaxPh[];
         console.log("ACAAAAAAAAA MAXIMO DE PHHHHHHHHHH");
         console.log(this.umbralMaxPh);

      } catch (err) {
        console.log(err);
      }
    }, 

    
    async fetchUmbralPhMin(): Promise<void> {
      try {
        const response = await fetch(`${BASE_URL}UmbralMinPh/lista`, {
          method: "GET",
          headers: new Headers({
            "Content-Type": "application/json",
            Authorization: "Bearer " + localStorage.getItem("token"),
          }),
        });
         this.UmbralMinPh = (await response.json()) as IUmbralMinPh[];
         console.log("ACAAAAAAAAA MINIMO DE PHHHHHHHHHHH");
         console.log(this.UmbralMinPh);

      } catch (err) {
        console.log(err);
      }
    }, 

    
    async fetchUmbralColorMax(): Promise<void> {
      try {
        const response = await fetch(`${BASE_URL}UmbralMaxColor/lista`, {
          method: "GET",
          headers: new Headers({
            "Content-Type": "application/json",
            Authorization: "Bearer " + localStorage.getItem("token"),
          }),
        });
         this.UmbralMaxColor = (await response.json()) as IUmbralMaxColor[];
         console.log("ACAAAAAAAAA MAXIMO DE COLOOOOOOOOOOOOOOR");
         console.log(this.UmbralMaxColor);

      } catch (err) {
        console.log(err);
      }
    }, 

    
    async fetchUmbralColorMin(): Promise<void> {
      try {
        const response = await fetch(`${BASE_URL}UmbralMinColor/lista`, {
          method: "GET",
          headers: new Headers({
            "Content-Type": "application/json",
            Authorization: "Bearer " + localStorage.getItem("token"),
          }),
        });
         this.UmbralMinColor = (await response.json()) as IUmbralMinColor[];
         console.log("ACAAAAAAAAA MINIMO DE COLOOOOOOOOOOOR");
         console.log(this.UmbralMinColor);

      } catch (err) {
        console.log(err);
      }
    },     


    async submit(): Promise<void> {
      // guardar UmbralTempMax

      try {
        const response = await fetch(`${BASE_URL}UmbralMaxTemperatura`, {
          method: "POST",
          headers: new Headers({
            "Content-Type": "application/json",
            Authorization: "Bearer " + localStorage.getItem("token"),
          }),
          body: JSON.stringify(this.umbralMaxTempJson),
          

          
        });
       this.message =
              "El umbral de temperatura máxima se ha actualizado.";
                      setTimeout(() => {
            this.message = "";
            this.$router.push(
              `/dashboard`
            );
        }, 1000);        
      } catch (err) {
        console.log(err);
        console.log(this.selectrico)
        console.log("AHORAAAAAA")
        console.log(this.umbralMaxTempJson)

      }
    },

    async submitMin(): Promise<void> {
      // guardar UmbralTempMax

      try {
        const response = await fetch(`${BASE_URL}UmbralMinTemperatura`, {
          method: "POST",
          headers: new Headers({
            "Content-Type": "application/json",
            Authorization: "Bearer " + localStorage.getItem("token"),
          }),
          body: JSON.stringify(this.umbralMinTempJson),
          

          
        });
       this.message =
              "El umbral de temperatura mínima se ha actualizado.";
                      setTimeout(() => {
            this.message = "";
            this.$router.push(
              `/dashboard`
            );
        }, 1000);  
      } catch (err) {
        console.log(err);
        console.log("AHORAAAAAA MIIIIIIIIIIIIIN")
        console.log(this.umbralMinTempJson)

      }
    },    

    async submitHumedadMax(): Promise<void> {
      // guardar UmbralTempMax

      try {
        const response = await fetch(`${BASE_URL}UmbralMaxHumedad`, {
          method: "POST",
          headers: new Headers({
            "Content-Type": "application/json",
            Authorization: "Bearer " + localStorage.getItem("token"),
          }),
          body: JSON.stringify(this.umbralMaxHumedadJson),
          

          
        });
       this.message =
              "El umbral de humedad máxima se ha actualizado.";
                      setTimeout(() => {
            this.message = "";
            this.$router.push(
              `/dashboard`
            );
        }, 1000);  
      } catch (err) {
        console.log(err);
        console.log("AHORAAAAAAPOOSTTTT MAAAAAAAXHUMEDAAAAAAAAAAD")
        console.log(this.umbralMaxHumedadJson)

      }
    }, 


      async submitHumedadMin(): Promise<void> {
      // guardar UmbralTempMax

      try {
        const response = await fetch(`${BASE_URL}UmbralMinHumedad`, {
          method: "POST",
          headers: new Headers({
            "Content-Type": "application/json",
            Authorization: "Bearer " + localStorage.getItem("token"),
          }),
          body: JSON.stringify(this.umbralMinHumedadJson),
          

          
        });
       this.message =
              "El umbral de humedad mínima se ha actualizado.";
                      setTimeout(() => {
            this.message = "";
            this.$router.push(
              `/dashboard`
            );
        }, 1000);  
      } catch (err) {
        console.log(err);
        console.log("AHORAAAAAAPOOSTTTT MIIIIIINHUMEDAAAAAAAAAAD")
        console.log(this.umbralMinHumedadJson)

      }
    },   


    async submitPhMax(): Promise<void> {
      // guardar UmbralTempMax

      try {
        const response = await fetch(`${BASE_URL}UmbralMaxPh`, {
          method: "POST",
          headers: new Headers({
            "Content-Type": "application/json",
            Authorization: "Bearer " + localStorage.getItem("token"),
          }),
          body: JSON.stringify(this.umbralMaxPhJson),
          

          
        });
       this.message =
              "El umbral de pH máximo se ha actualizado.";
                      setTimeout(() => {
            this.message = "";
            this.$router.push(
              `/dashboard`
            );
        }, 1000);  
      } catch (err) {
        console.log(err);
        console.log("AHORAAAAAAPOOSTTTT MAX PPPPPPHHHHHHHH")
        console.log(this.umbralMaxPhJson)

      }
    },     

        async submitPhMin(): Promise<void> {
      // guardar UmbralTempMax

      try {
        const response = await fetch(`${BASE_URL}UmbralMinPh`, {
          method: "POST",
          headers: new Headers({
            "Content-Type": "application/json",
            Authorization: "Bearer " + localStorage.getItem("token"),
          }),
          body: JSON.stringify(this.umbralMinPhJson),
          

          
        });
       this.message =
              "El umbral de pH mínimo se ha actualizado.";
                      setTimeout(() => {
            this.message = "";
            this.$router.push(
              `/dashboard`
            );
        }, 1000);  
      } catch (err) {
        console.log(err);
        console.log("AHORAAAAAAPOOSTTTT MIN PPHHHH")
        console.log(this.umbralMinPhJson)

      }
    }, 

    async submitColorMax(): Promise<void> {
      // guardar UmbralTempMax

      try {
        const response = await fetch(`${BASE_URL}UmbralMaxColor`, {
          method: "POST",
          headers: new Headers({
            "Content-Type": "application/json",
            Authorization: "Bearer " + localStorage.getItem("token"),
          }),
          body: JSON.stringify(this.umbralMaxColorJson),
          

          
        });
       this.message =
              "El umbral de color máximo se ha actualizado.";
                      setTimeout(() => {
            this.message = "";
            this.$router.push(
              `/dashboard`
            );
        }, 1000);  
      } catch (err) {
        console.log(err);
        console.log("AHORAAAAAAPOOSTTTT MAX COLOOOOOOOOOOOOR")
        console.log(this.umbralMaxColorJson)

      }
    }, 


    async submitColorMin(): Promise<void> {
      // guardar UmbralTempMax

      try {
        const response = await fetch(`${BASE_URL}UmbralMinColor`, {
          method: "POST",
          headers: new Headers({
            "Content-Type": "application/json",
            Authorization: "Bearer " + localStorage.getItem("token"),
          }),
          body: JSON.stringify(this.umbralMinColorJson),
          

          
        });
       this.message =
              "El umbral de color mímimo se ha actualizado.";
                      setTimeout(() => {
            this.message = "";
            this.$router.push(
              `/dashboard`
            );
        }, 1000);  
      } catch (err) {
        console.log(err);
        console.log("AHORAAAAAAPOOSTTTT MIN COLOOOOOOOOOOOOR")
        console.log(this.umbralMinColorJson)

      }
    }, 





 
    


  },
  mounted() {
   
    (async () => {

      try {
        this.userInfoJson = await getUsuario();
        console.log(this.userInfoJson);
        this.calculateDashBoard();
      } catch (err) {
        console.log(err);
      }

    //AQUI ESTA EL UMBRAL SOLO PARA ADMINISTRADORES
      if (this.userInfoJson.rol === rol.ADMINISTRADOR){
        await this.fetchUmbral();
        //await this.submit();
        await this.fetchUmbralMinimo();
        await this.fetchUmbralHumedadMax();
        await this.fetchUmbralHumedadMin();
        await this.fetchUmbralPhMax();
        await this.fetchUmbralPhMin();
        await this.fetchUmbralColorMax();
        await this.fetchUmbralColorMin();
        await this.correitohum();
        await this.correitoph();
        await this.correitotemp();

        await this.correitocolor();
 
        }



      if (this.userInfoJson.rol === rol.AGRICULTOR) {


        const optionsLineChart = configureLineChartOptions(lineChartSeries);
        const optionsTreeMapChart =
          configureTreeMapChartOptions(treeMapChartSeries);







        /*if (this.$refs.lineChart) {
          const lineChart = new ApexCharts(
            this.$refs.lineChart,
            optionsLineChart
          );
          lineChart.render();
        } */  //para tp2, es ahora el grafico de humedad

        if (this.$refs.treeMapChart) {
          const treeMapChart = new ApexCharts(
            this.$refs.treeMapChart,
            optionsTreeMapChart
          );
          treeMapChart.render();
        }
      }

      //aca comienza lo que tendra el administrador 

  if (this.userInfoJson.rol === rol.ADMINISTRADOR || rol.AGRICULTOR) {
  



        const optionsLineChart = configureLineChartOptions(lineChartSeries);
        const optionsLineChartTemperatura= configureLineChartOptionsTemperatura(lineChartSeriesTemperatura);
        const optionsLineChartColor= configureLineChartOptionsColor(lineChartSeriesColor);
        const optionsLineChartPH= configureLineChartOptionsPH(lineChartSeriesPH);

        const optionsTreeMapChart =
          configureTreeMapChartOptions(treeMapChartSeries);






        if (this.$refs.lineChart) {
          const lineChart = new ApexCharts(
            this.$refs.lineChart,
            optionsLineChart
          );
          lineChart.render();
        }

        if (this.$refs.lineChartTemperatura) {
          const lineChartTemperatura = new ApexCharts(
            this.$refs.lineChartTemperatura,
            optionsLineChartTemperatura
          );
          lineChartTemperatura.render();
        }
        

        if (this.$refs.lineChartColor) {
          const lineChartColor = new ApexCharts(
            this.$refs.lineChartColor,
            optionsLineChartColor
          );
          lineChartColor.render();
        }

        if (this.$refs.lineChartPH) {
          const lineChartPH = new ApexCharts(
            this.$refs.lineChartPH,
            optionsLineChartPH
          );
          lineChartPH.render();
        }
        

        if (this.$refs.treeMapChart) {
          const treeMapChart = new ApexCharts(
            this.$refs.treeMapChart,
            optionsTreeMapChart
          );
          treeMapChart.render();
        }
      }



      if (
        this.userInfoJson.rol === "Agricultores" ||
        this.userInfoJson.rol === "Administrador"
      ) {
        try {
          const response = await fetch(
            `${BASE_URL}evaluacion/count?visible=true`,
            {
              method: "GET",
              headers: new Headers({
                "Content-Type": "application/json",
                Authorization: "Bearer " + localStorage.getItem("token"),
              }),
            }
          );

          this.numberEvaluaciones = await response.json();
        } catch (err) {
          console.log(err);
        }
      }
    })();
  },
  beforeCreate() {
    document.querySelector("body")!.setAttribute("style", "background:#d2d2d2");
  },
  beforeUnmount() {
    document.querySelector("body")!.setAttribute("style", "");
  },
});
</script>

<style scoped>
/* Usar scope para aplicar estilos solo a esta interfaz y que no perjudique al resto */
h1 {
  font-weight: 900;
  font-size: xx-large;
}

.gridCards {
  margin: auto;
  max-width: 1000px;
  display: grid;
  gap: 100px;
  justify-content: left;
}

.gridCards.adminGrid {
  grid-template-columns: repeat(auto-fill, minmax(100%, 1fr));
  justify-content: center;
}
.gridCards.adminGrid .card {
  margin: auto;
}

.gridCards.adminGrid img {
  width: 100%;
}

.gridCards.especialistaGrid {
  margin-top: 11vw;
  grid-template-columns: repeat(auto-fill, minmax(20%, 1fr));
  justify-content: center;
}

.gridEspecialista {
  background-color: ghostwhite;
  cursor: pointer;
  border: 1px solid var(--placeholder);
  border-radius: 12px;
  width: 200px;
  margin: 10px;
  padding: 20px;
  box-shadow: 0 2px 8px var(--box-shadow);
  transition: all 0.2s linear;
}

.gridCards.stats {
  position: absolute;
  top: 18%;
  right: 40px;
}

.gridCards p {
  font-weight: bold;
}

.flex-row {
  margin-top: 65px;
  justify-content: space-around;
}

.action-button {
  width: 200px;
  padding-left: 2px;
  padding-right: 2px;
}

.image {
  width: 100px;
  height: 100px;
}

.card {
  background-color: ghostwhite;
  cursor: pointer;
  border: 1px solid var(--placeholder);
  border-radius: 12px;
  width: 200px;
  margin: 10px;
  padding: 20px;
  box-shadow: 0 2px 8px var(--box-shadow);
  transition: all 0.2s linear;
}


#right-side {
  position: relative;
  top: -128px;
  right: -50px;
  text-align: left;
  /*position: relative;
  top: -128px;
  left: calc(20% + 220px);
  width: calc(80% - 220px);
  height: calc(100vh - 150px);
  text-align: left;*/
}

#right-side .titleProfile {
  position: absolute;
  top: -50px;
  right: 55%;
  font-weight: bold;
  font-size: 22px;
}

.card.stat {
  min-width: 250px;
}



.card.stat.donut {
  margin-top: 20px;
  min-width: 345px;
}

.restulado-eva {
  box-sizing: border-box;
  background: ghostwhite;
  font-style: normal;
  font-weight: 100;
  font-family: system-ui;
  min-width: 450px !important;
  width: 100% !important;
}

.card:hover {
  background: var(--secondary-color);
  /* opacity: 90%; */
}
.card.stat:hover {
  background: none;
}
#chart {
  margin: 35px auto;
  display: flex;
  justify-content: center;
}
.container {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 10px;
}
.row {
  display: flex;
  flex-direction: row;
  justify-content: center;
}
.col {
  display: flex;
  flex-direction: column;
  width: 100%;
  margin: 10px;
}
.mycard {
  width: 85%;
  height: 200px;
  margin: 10px;
  padding: 10px;

  cursor: pointer;
  border: 1px solid var(--placeholder);
  border-radius: 12px;
  box-shadow: 0 2px 8px var(--box-shadow);
  transition: all 0.2s linear;
}
.mydonut {
  height: 280px;
}
.donut-container {
  width: 400px;
}
.count {
  height: 100px;
}
.pie {
  height: 480px;
  /* aca podiamos meter el width*/
}
.line {
  height: 480px;
}
.linegod {
  height: 800px;
  width: 1600px;
}

.btn-table {
  margin-top: 10px;
  padding: 5px 60px;
  border-radius: 10px;
  font-weight: bold;
}
.btn-table:hover {
  color: #fff;
}
.fondou {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: -3;
  background-color: #d2d2d2;
  /* background-image: url("../assets/images/blanquito.jpg"); */
  height: 100%;

  background-repeat: no-repeat;
  background-size: cover;
}
</style>    