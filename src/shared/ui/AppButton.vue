<script setup lang="ts">
interface Props {
  text: string;
  variant?: 'primary' | 'secondary' | 'default';
  size?: 'sm' | 'md' | 'lg';
  href?: string;
  disabled?: boolean;
  loading?: boolean;
  fullWidth?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'primary',
  size: 'md',
  disabled: false,
  loading: false,
  fullWidth: false,
});

const emit = defineEmits<{
  click: [event: Event];
}>();

const buttonClasses = computed(() => {
  const base = 'inline-flex items-center justify-center font-semibold rounded-full transition-all duration-300 focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed';

  const variants = {
    primary: 'bg-blue-600 hover:bg-orange-500 text-white transform hover:scale-105',
    secondary: 'bg-white hover:bg-orange-500  text-gray-900',
    default: 'bg-black hover:bg-orange-500  text-white',
  };

  const sizes = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-2 md:py-3 text-sm md:text-lg',
    lg: 'px-12 py-2 md:py-4 text-xl',
  };

  const classes = [base, variants[props.variant], sizes[props.size]];

  if (props.fullWidth) {
    classes.push('w-full');
  } else {
    classes.push('w-full md:w-auto');
  }

  return classes.join(' ');
});

function handleClick(event: Event) {
  if (!props.disabled && !props.loading) {
    emit('click', event);
  }
}
</script>

<template>
  <button
    v-if="!href"
    :class="buttonClasses"
    :disabled="disabled || loading"
    @click="handleClick"
  >
    <div v-if="loading" class="rounded-full h-4 w-4  border-2 border-white border-t-transparent mr-2" />
    <span>{{ text }}</span>
  </button>

  <NuxtLink
    v-else
    :to="href"
    :class="buttonClasses"
    @click="handleClick"
  >
    <span>{{ text }}</span>
  </NuxtLink>
</template>
