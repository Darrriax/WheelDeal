<template>
  <layout>
    <div class="px-3 col-12" id="profile">
      <div v-if="cars.length > 0">
        <h5 class="py-3 text-center">{{ $t('car.cars') }}</h5>
        <car-box/>
      </div>
      <div v-else>
        <box>
          {{ $t('car.noFound') }}
        </box>
      </div>
    </div>
  </layout>
</template>

<script>
import {mapState} from "vuex";
import Layout from "@/components/layout.vue";
import Box from "@/components/UI/main/Box.vue";
import CarBox from "@/components/pages/car/CarBox.vue";

export default {
  name: "Cars",
  components: {CarBox, Box, Layout},
  computed: {
    ...mapState('car', {
      cars: state => state.cars,
      car: state => state.car,
    }),
  },

};
</script>