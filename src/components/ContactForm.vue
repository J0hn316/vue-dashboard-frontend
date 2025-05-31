<template>
  <form
    @submit.prevent="handleSubmit"
    class="space-y-6 max-w-xl mx-auto bg-white dark:bg-gray-800 p-6 rounded-xl shadow"
  >
    <h2 class="text-2xl font-bold">Contact Us</h2>

    <!-- Name Input -->
    <div>
      <label for="name" class="block font-semibold mb-1"> Name </label>
      <input
        v-model="name"
        id="name"
        type="text"
        placeholder="Your name"
        class="w-full px-4 py-2 rounded border dark:border-gray-600 dark:bg-gray-900 dark:text-white"
        required
      />
    </div>

    <!-- Email Input -->
    <div>
      <label for="email" class="block font-semibold mb-1">Email</label>
      <input
        v-model="email"
        id="email"
        type="email"
        placeholder="Your email"
        class="w-full px-4 py-2 rounded border dark:border-gray-600 dark:bg-gray-900 dark:text-white"
        required
      />
    </div>

    <!-- Message Input -->
    <div>
      <label for="message" class="block font-semibold mb-1">Message</label>
      <textarea
        v-model="message"
        id="message"
        rows="4"
        placeholder="Your message"
        class="w-full px-4 py-2 rounded border dark:border-gray-600 dark:bg-gray-900 dark:text-white"
        required
      />
    </div>

    <!-- Custom Submit button  -->
    <BaseButton type="submit" :disabled="isSubmitting">
      <template #icon v-if="isSubmitting">
        <svg
          class="animate-spin h-4 w-4 text-white"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            class="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            stroke-width="4"
          />
          <path
            class="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
          />
        </svg>
      </template>
      <span>{{ isSubmitting ? 'Sending...' : 'Send' }}</span>
    </BaseButton>

    <!-- Confirmation message -->
    <p
      v-if="submitted && !isSubmitting"
      class="flex items-center gap-2 text-black bg-green-100 dark:bg-green-900 dark:text-white px-4 py-2 rounded-lg shadow transition-opacity duration-500 mt-4"
    >
      <svg
        class="h-5 w-5 text-green-700"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M5 13l4 4L19 7"
        />
      </svg>
      Thanks! Your message has been sent.
    </p>
  </form>
</template>

<script setup>
import { ref } from 'vue';
import BaseButton from './ui/BaseButton.vue';

// state
const name = ref('');
const email = ref('');
const message = ref('');
const submitted = ref(false);
const isSubmitting = ref(false);

const handleSubmit = async () => {
  // Just console.log for now, Normally code would send to backend API
  console.log({ name: name.value, email: email.value, message: message.value });

  isSubmitting.value = true;
  submitted.value = false;

  await new Promise((resolve) => setTimeout(resolve, 2000));

  submitted.value = true;
  isSubmitting.value = false;

  setTimeout(() => {
    submitted.value = false;
  }, 2100);

  name.value = '';
  email.value = '';
  message.value = '';
};
</script>
