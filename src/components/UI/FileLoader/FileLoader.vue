<template>
    <div class="container m-0-auto file-loader">
      <input @click.prevent="store" type="submit" class="btn btn-primary w20 m-0-auto d-block" value="add">
      <div
          class="w-75 mt-3 preview displayFlex flex-wrap row-cols-md-4 row-cols-lg-5 row-cols-xl-6 row-cols-xxl-6 m-0-auto">
        <div ref="dropzone"
             class="file-loader__upload
          m-0-auto cursorPointer bg-dark bg-opacity-75 text-center text-light"
        >
          <span>Load Files</span>
        </div>
      </div>
      <div class="file" style="display: none">
          <div class="dz-preview dz-file-preview col">
            <div class="dz-details">
              <div class="dz-image">
                <img data-dz-thumbnail>
                <button class="dz-error-mark cursorPointer"><span data-dz-remove>✘</span></button>
              </div>
            </div>
            <div class="dz-progress"><span class="dz-upload" data-dz-uploadprogress></span></div>
            <div class="dz-filename"><span data-dz-name></span></div>
            <div class="dz-size" data-dz-size></div>
          </div>
      </div>
    </div>
</template>

<script>
import Dropzone from "dropzone";
import {
  DEFAULT_FILE_IMG,
  EXCEL_IMG,
  PDF_IMG,
  POWER_POINT_IMG, VIDEO_IMG,
  WORD_IMG
} from "../../../utils/constants";

export default {
  name: "FileLoader",
  components: {},
  data() {
    return {
      dropzone: null,
    }
  },
  methods: {
    store() {
      const formData = new FormData();
      const files = this.dropzone.getAcceptedFiles();
      files.forEach(file => {
        formData.append("documents", file);
        this.dropzone.removeFile(file);
      });
      // this.$store.dispatch('user/onLoadFiles', formData);
    }
  },
  mounted() {
    this.dropzone = new Dropzone(this.$refs.dropzone, {
      init: function () {
        this.on("addedfile", ()=> {
        });
        this.on("removedfile", ()=> {
        });
        // this.on("queuecomplete", ()=> {
        //   console.log(this);
        //   console.log(3);
        // });
        // this.on("totaluploadprogress", function (progress) {
        //   console.log(4);
        //   let elProgress = document.getElementById("#progress-bar");  // my progress bar
        //   console.log(progress);
        //   if (elProgress === undefined || elProgress === null) return;
        //
        //   elProgress.style.width = progress + "%";  // changing progress bar's length based on progress value
        // });
      },
      url: "/",
      // accept: function (file) {
      //   console.log(11);
      //   console.log(file);
      // },
      // sending: function (file) {
      //   console.log(22);
      //   console.log(file);
      // },
      autoProcessQueue: false,
      previewsContainer: ".preview",
      previewTemplate: document.querySelector('.file').innerHTML,
      addedfiles: function (files) {
        for (const file of files) {
          let thumbnailElement = file.previewElement.querySelector("[data-dz-thumbnail]");
          thumbnailElement.alt = file.name;
          if (file.type === "application/pdf") {
            thumbnailElement.src = PDF_IMG;
          } else if (file.type.includes("video")) {
            thumbnailElement.src = VIDEO_IMG;
          } else if (file.name.includes(".docx")) {
            thumbnailElement.src = WORD_IMG;
          } else if (file.name.includes(".xlsx")) {
            thumbnailElement.src = EXCEL_IMG;
          } else if (file.name.includes(".pptx")) {
            thumbnailElement.src = POWER_POINT_IMG;
          } else if (!file.type || file.name.includes(".zip") || file.name.includes(".rar")) {
            thumbnailElement.src = DEFAULT_FILE_IMG;
          }
          thumbnailElement.width = 120;
          thumbnailElement.height = 120;
        }
      }
    });

  }
}
</script>

<style scoped></style>