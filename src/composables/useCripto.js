import { ref, onMounted, computed } from 'vue';

export default function useCripto() {
  const monedas = ref([
    { codigo: 'USD', nombre: 'Dolar de Estados Unidos' },
    { codigo: 'MXN', nombre: 'Peso Mexicano' },
    { codigo: 'EUR', nombre: 'Euro' },
    { codigo: 'GBP', nombre: 'Libra Esterlina' },
    { codigo: 'JPY', nombre: 'Yen Japones' },
  ]);

  const critptomonedas = ref([]);

  onMounted(() => {
    const url =
      'https://min-api.cryptocompare.com/data/top/mktcapfull?limit=10&tsym=USD';
    fetch(url)
      .then((response) => response.json())
      .then(({ Data }) => {
        critptomonedas.value = Data;
      });
  });

  const dataCotizada = ref({});

  const cargando = ref(false);

  const obtenerCotizacion = async (cotizacion) => {
    cargando.value = true;
    dataCotizada.value = {};
    const { moneda, criptomoneda } = cotizacion;
    const url = `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${criptomoneda}&tsyms=${moneda}`;
    const response = await fetch(url);
    const data = await response.json();
    dataCotizada.value = data.DISPLAY[criptomoneda][moneda];
    cargando.value = false;
  };

  const mostrarResultado = computed(() => {
    return Object.keys(dataCotizada.value).length;
  });

  return {
    monedas,
    critptomonedas,
    cargando,
    dataCotizada,
    obtenerCotizacion,
    mostrarResultado,
  };
}
