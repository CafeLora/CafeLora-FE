<template>
  <div class="spinnerReplace"></div>
</template>

<style scoped>
.spinnerReplace {
  position: relative;
  -webkit-animation: spin 1s linear infinite; /* Safari */
  animation: spin 1s linear infinite;
  height: 43px;
  width: 43px;
  border: 8px solid var(--secondary-variant);
  border-radius: 50%;
  border-top: 8px solid var(--secondary-color);
  margin: auto;
  margin-top: 10px;
  z-index: 100;
}

.spinner {
  position: fixed;
  -webkit-animation: spin 1s linear infinite; /* Safari */
  animation: spin 1s linear infinite;
  height: 100px;
  width: 100px;
  border: 8px solid var(--secondary-variant);
  border-radius: 50%;
  border-top: 8px solid var(--secondary-color);
  top: 50%;
  left: 50%;
  z-index: 100;
}

@-webkit-keyframes spin {
  0% {
    -webkit-transform: rotate(0deg);
  }
  100% {
    -webkit-transform: rotate(360deg);
  }
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>