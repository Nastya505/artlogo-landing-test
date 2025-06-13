import type { CartTotalOption } from '../ui/CartTotal.vue';
import type { FileUploaderOption } from '../ui/FileUploaderOption.vue';
import type { PaymentButtonsOption } from '../ui/PaymentButtons/PaymentButtons.vue';
import type { PaymentTrustsOption } from '../ui/PaymentTrusts.vue';
import type { ProductSwitchOption } from '../ui/ProductSwitch.vue';
import type { SwatchesOption } from '../ui/Swatches.vue';
import type { LargeTextInputOption, TextInputOption } from '../ui/TextInput.vue';
import type { VariantSelectorOption } from '../ui/VariantSelector.vue';
import { z } from 'zod';

export const validationSchemas = {
  email: z.string().email(),
};

export interface OptionBase {
  type: string;
  product_label: string;
  cart_label: string;
  send_value_to_cart: boolean;
  tooltip: string;
  show_background_color: boolean;
  background_color: string;
  is_required: boolean;
  url_param_key: string;
}

export interface ConditionOption extends OptionBase {
  type: 'condition';
  condition_type: 'show' | 'hide';
  apply_to_label_on_cart: string;
  condition_label_on_cart: string;
  condition_label_on_cart_value: string;
  condition_comparing_method: 'contains' | 'is' | 'is_not';
}

export type ProductCustomParameters = Record<string, string | undefined>;

export interface ProductVariantToAddToCart {
  id: number;
  selling_plan?: number;
  selling_plan_radio?: number;
  quantity: number;
  properties?: ProductCustomParameters;
  price: number;
  title: string;
}
export interface UploadFileWithTextInputOption {
  type: 'upload_file_with_text_input';
  fileUploader: FileUploaderOption;
  largeTextInput: LargeTextInputOption;
}
export type ProductOption =
  | SwatchesOption
  | ConditionOption
  | TextInputOption
  | LargeTextInputOption
  | ProductSwitchOption
  | CartTotalOption
  | PaymentButtonsOption
  | PaymentTrustsOption
  | VariantSelectorOption
  | FileUploaderOption
  | UploadFileWithTextInputOption;

export interface ProductOptionsSection {
  product: any;
  showPadding: boolean;
  showBackgroundColor: boolean;
  backgroundColor: string;
  optionsSet: ProductOption[];
  heading: string;
  currency_message_mode: 'true' | 'false' | 'dollars';
}
