<template>
  <div class="carousel-container">
    <div class="carousel">
      <!-- Кнопка попереднього зображення -->
      <button @click="prev" class="carousel-button prev-button">←</button>

      <!-- Зображення з перевіркою, щоб не було undefined -->
      <img v-if="images.length > 0" :src="images[currentIndex]" alt="Car Image" class="carousel-image" />

      <!-- Кнопка наступного зображення -->
      <button @click="next" class="carousel-button next-button">→</button>
    </div>
  </div>
</template>

<script>
export default {
  props: ['items'],
  data() {
    return {
      currentIndex: 0,
    };
  },
  computed: {
    images() {
      return this.items || [];
    },
  },
  methods: {
    // Метод для переходу до попереднього зображення
    prev() {
      if (this.currentIndex > 0) {
        this.currentIndex--;
      } else {
        this.currentIndex = this.images.length - 1;
      }
    },
    // Метод для переходу до наступного зображення
    next() {
      if (this.currentIndex < this.images.length - 1) {
        this.currentIndex++;
      } else {
        this.currentIndex = 0;
      }
    },
  },
};
</script>

<style scoped>
.carousel-container {
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
}

.carousel {
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
}

.carousel-button {
  background-color: rgba(0, 0, 0, 0.5);
  color: white;
  border: none;
  padding: 10px;
  font-size: 24px;
  cursor: pointer;
  border-radius: 5px;
  transition: background-color 0.3s;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  z-index: 10;
}

.carousel-button:hover {
  background-color: rgba(0, 0, 0, 0.8);
}

.prev-button {
  left: 10px;
}

.next-button {
  right: 10px;
}

</style>