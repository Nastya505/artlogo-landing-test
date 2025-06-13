<script setup lang="ts">
import type { OptionBase } from '../model/types';
// import { FileUploader } from '@artlogo-co/ui-kit';
import { useOptionsStore } from '../model/OptionsStore';

export interface FileUploaderOption extends OptionBase {
  type: 'file_uploader';
  label: string;
  accept: string;
}
const props = defineProps<{ option: FileUploaderOption }>();

const optionsStore = useOptionsStore();
</script>

<template>
  <div class="w-full md:w-80 flex flex-col items-center justify-center">
    <div v-if="optionsStore.mainProduct.customParams[props.option.cart_label]" class="flex items-center w-full justify-center">
      <img
        :src="optionsStore.mainProduct.customParams[option.cart_label]"
        alt="Uploaded Image"
        class="max-w-full max-h-96 object-cover mb-5 md:mb-0 rounded-lg"
      >
    </div>
    <div class="fileuploader__wrapper w-full md:w-80 flex flex-col  text-white items-center justify-center">
      <FileUploader
        v-model="(optionsStore.mainProduct.customParams[option.cart_label] as string)"
        :labels="{ main: 'Choose file' }"
        :accept="option.accept"
        display-mode="advanced"
        image-editor
      />
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
  border: 1px dashed #2563eb;
  }
  :deep(.art-fileuploader-advanced__drag-icon){
  background: #fff;
  border-radius: 20px;
  color: #2563eb;
  transition: background 0.3s ease;
  }
  :deep(.art-fileuploader-advanced__drag-icon:hover){
  background: #f97316;
  }
  :deep(.art-fileuploader-advanced__drag-icon:before){
  background-image: url('https://cdn.shopify.com/s/files/1/0594/4639/5086/files/drag-cloud-icon.png?v=1749529676');
  }
  :deep(.art-fileuploader__wrapper) {
    background-color: #fff;
    border: none;
    color: #2563eb;
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
</style>
