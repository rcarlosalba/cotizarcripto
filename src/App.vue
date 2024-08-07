<script setup>
import { ref, reactive } from 'vue';
import Alerta from './components/Alerta.vue';
import Spinner from './components/Spinner.vue';
import useCripto from './composables/useCripto';

const { monedas, critptomonedas, dataCotizada, cargando, obtenerCotizacion, mostrarResultado } = useCripto();

const error = ref('')

const cotizacion = reactive({
    moneda: '',
    criptomoneda: '',
  });

const cotizarCriptoMoneda = ()=>{
  if(Object.values(cotizacion).includes('')){
    error.value = 'Todos los campos son obligatorios';
    return;
  }
  error.value = '';
  obtenerCotizacion(cotizacion);
}

</script>

<template>
  <div class="contenedor">
    <h1 class="titulo">Cotizador de <span>Critptomonedas</span></h1>
    <div class="contenido">
      <Alerta v-if="error">
        {{error}}
      </Alerta>
      <form class="formulario"
        @submit.prevent="cotizarCriptoMoneda"
      >
        <div class="campo">
          <label for="moneda">Moneda: </label>
          <select id="moneda"
            v-model="cotizacion.moneda">
            <option value="" disabled selected>Elige tu moneda</option>
            <option v-for="moneda in monedas" :value="moneda.codigo" :key="moneda.codigo">{{ moneda.nombre }}</option>
          </select>
        </div>
        <div class="campo">
          <label for="cripto">Critptomoneda: </label>
          <select id="cripto"
            v-model="cotizacion.criptomoneda"
          >
            <option value="" disabled selected>Elige tu Critptomoneda</option>
            <option v-for="criptomoneda in critptomonedas" :value="criptomoneda.CoinInfo.Name" :key="criptomoneda.CoinInfo.Id">{{ criptomoneda.CoinInfo.FullName }}</option>
          </select>
        </div>
        <input type="submit" value="Cotizar">
      </form>
      <Spinner v-if="cargando"/>
      <div class="contenedor-resultado"
        v-if="mostrarResultado"
      >
        <h2>Cotización</h2>
        <div class="resultado">
          <img :src="`https://cryptocompare.com/${dataCotizada.IMAGEURL}`" :alt="`Logo de ${cotizacion.criptomoneda}`">
          <div>
            <p><span>Precio:</span> {{dataCotizada.PRICE}}</p>
            <p><span>Precio más alto del día:</span> {{dataCotizada.HIGHDAY}}</p>
            <p><span>Precio más bajo del día:</span> {{dataCotizada.LOWDAY}}</p>
            <p><span>Variación últimas 24 horas:</span> {{dataCotizada.CHANGEPCT24HOUR}}%</p>
            <p><span>Última actualización:</span> {{dataCotizada.LASTUPDATE}}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>