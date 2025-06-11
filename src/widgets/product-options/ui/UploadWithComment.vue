<script setup lang="ts">
import { useOptionsStore } from '../model/OptionsStore';
import TextInput from './TextInput.vue';

const props = defineProps<{
  fileCartLabel?: string; 
  textCartLabel: string; 
  accept?: string;
  textareaLabel?: string;
}>();
const optionsStore = useOptionsStore();
</script>

<template>
  <div class="w-full">
    <h2 class="text-3xl text-center md:text-5xl font-normal text-white mb-5 md:mb-10 leading-tight">
      Help us design your perfect logo
    </h2>
    <div class="flex flex-col md:flex-row gap-6 md:gap-8 w-full items-start justify-center">
      <!-- Textarea -->
      <div class="flex-1 w-full">
        <TextInput
          v-model="optionsStore.mainProduct.customParams[props.textCartLabel]"
          :option="{
            cart_label: props.textCartLabel,
            type: 'large_text_input',
            placeholder_text: 'Tell us a bit about yourself or your business — it\'ll help us work quicker and deliver even better results for you!',
            character_limit: 1000,
            product_label: props.textareaLabel || '',
            send_value_to_cart: true,
            show_background_color: false,
            background_color: '',
            is_required: false,
            url_param_key: '',
            tooltip: '',
          }"
        />
      </div>
      <!-- FileUploader -->
      <!-- <div class="w-full md:w-80 flex flex-col items-center justify-center">
        <div v-if="optionsStore.mainProduct.customParams[props.fileCartLabel]" class="flex items-center w-full justify-center">
          <img
            :src="optionsStore.mainProduct.customParams[props.fileCartLabel]"
            alt="Uploaded Image"
            class="max-w-full max-h-96 object-cover mb-5 md:mb-0 rounded-lg"
          >
        </div> -->
        <!-- <div class="fileuploader__wrapper w-full md:w-80 flex flex-col  text-white items-center justify-center"> -->
          <!-- <FileUploader
            v-model="(optionsStore.mainProduct.customParams[props.fileCartLabel] as string)"
            :labels="{ main: 'Choose file' }"
            accept="image/jpeg, image/png, image/jpg, image/webp, image/svg"
            display-mode="advanced"
            image-editor
          /> -->
        <!-- </div> -->
      <!-- </div> -->
    </div>
  </div>
</template>

<style scoped lang="scss">
.fileuploader__wrapper {

  :deep(.el-upload-dragger){
  background: none;
  padding: 44.5px 10px;

  }
  :deep(.el-upload-dragger:hover){
  border: 1px dashed #0077FF;
  }
  :deep(.art-fileuploader-advanced__drag-icon){
  background: #fff;
  border-radius: 20px;
  color: #0077FF;
  }
  :deep(.art-fileuploader-advanced__drag-icon:before){
  background-image: url('https://cdn.shopify.com/s/files/1/0594/4639/5086/files/drag-cloud-icon.png?v=1749529676');
  }
  :deep(.art-fileuploader__wrapper) {
    background-color: #fff;
    border: none;
    color: #0077FF;
    text-decoration: none;
    max-width: 288px;
    margin: 0 auto;
    height: 54px;
  }
  :deep(.art-fileuploader__label--active) {
    text-decoration: none;
    font-weight: 700;
    font-size: 18px;
  }
  :deep(.art-fileuploader-advanced__preview-actions) {
    align-items: stretch;
  }
}
:deep(.art-fileuploader__wrapper) {
  background: none !important;
  border: none !important;
  box-shadow: none !important;
  margin: 0 !important;
  padding: 0 !important;
  max-width: 100% !important;
  height: auto !important;
}
:deep(.art-fileuploader__label--active) {
  text-decoration: none;
  font-weight: 700;
  font-size: 18px;
}
:deep(.art-fileuploader-advanced__preview-actions) {
  align-items: stretch;
}
</style>
