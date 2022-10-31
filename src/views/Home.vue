<template>
  <section class="main-container">
    <section id="home">
      <div class="content">
        <h1><div class="plate">
  <p class="script1"><span>DETECCIÓN</span></p>
  <p class="shadow text1">DE LA</p>
  <p class="shadow text2">ROYA</p>
  <p class="shadow text3"></p>
  <p class="script1"><span>Con Lora</span></p>
</div></h1>
	

	<div>
    <p class="centrado">		<button @click="goToLogin()" class="action-button">ENTRAR</button></p>
	</div>
    
      </div>
    </section>
    <section id="features">
      <horizontal-flex-list
        :images="images"
        :size="'150px'"
        :bgcolor="'white'"
        :title="'MEDICIÓN DE LOS FACTORES AMBIENTALES'"
      ></horizontal-flex-list>
    </section>
    <the-footer></the-footer>
  </section>
</template>

<script lang="ts">
import HorizontalFlexList from "@/components/ui/HorizontalFlexList.vue";
import TheFooter from "@/components/layout/TheFooter.vue";
import { defineComponent } from "@vue/runtime-core";

export default defineComponent({
  components: {
    HorizontalFlexList,
    TheFooter,
  },
  data() {
    return {
      images: [
        {
          src: "humedad.png",
          description: "Humedad",
        },
        {
          src: "temperatura.png",
          description: "Temperatura",
        },
        {
          src: "ph.png",
          description: "pH",
        },
        {
          src: "color.png",
          description: "Color",
        },
      ],
    };
  },
  methods: {
    goToLogin(): void {
      this.$router.push('/auth');
    }
  }
});
</script>

<style scoped>
/* Ibrahim Jabbari -- www.ibrahimjabbari.com */
@import url(https://fonts.googleapis.com/css?family=Arvo:700);
@import url(https://fonts.googleapis.com/css?family=Seaweed+Script);
body {
  background-color: #222;
}
.plate {
  width: 410px;
  margin: 10% auto;
}
.shadow {
  color: #fff;
  font-family: Arvo;
  font-weight: bold;
 /* text-shadow:
    -3px -3px 0 #222,
    3px -3px 0 #222,
    -3px 3px 0 #222,
    3px 3px 0 #222,
    4px 4px 0 #fff,
    5px 5px 0 #fff,
    6px 6px 0 #fff,
    7px 7px 0 #fff;
    */
  line-height: 0.8em;
  letter-spacing: 0.1em;
  transform: scaleY(0.7);
  -webkit-transform: scaleY(0.7);
  -moz-transform: scaleY(0.7);
  margin:0;
  text-align: center;
}
.script1 {
  font-family: "Seaweed Script";
  color: #fff;
  text-align: center;
  font-size: 40px;
  position: relative;
  margin:0;
}
.script1 span {
  background-color: #222;
  padding: 0 0.3em;
}
.script1:before {
  content:"";
  display: block;
  position: absolute;
  z-index:-1;
  top: 50%;
  width: 100%;
  border-bottom: 3px solid #fff;
}
.text1 {
  font-size: 60px;
}
.text2 {
  font-size: 100px;
}

.main-container {
  z-index: 1;
  background: url("../assets/images/campo.png") no-repeat center center;
  background-size: 100% 100%;
  background-position: center;
  background-repeat: no-repeat;
  position: relative;
}

.main-container::before {
  z-index: -1;
  content: "";
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  height: 100%;
  width: 100%;
  background: var(--linear-gradient);
}

#home {
  height: 60vh;
}

.content {
  z-index: 2;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  height: 100%;
  padding-left: 30px;
  padding-top: 80px;
  padding-bottom: 160px;
}
.content * {
  color: white;
}

.content > h1 {
  font-size: 35px;
}

.content > p {
  margin-top: 20px;
  margin-bottom: 10px;
  width: 550px;
}

.centrado{
  text-align:center; 
  padding:8px;
  margin: 0 auto; 
  }


#banner {
}

</style>