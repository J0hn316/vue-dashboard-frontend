<template>
  <section>
    <h1 class="text-3xl font-bold mb-4">Welcome to the App</h1>
    <p>
      Click
      <RouterLink
        to="/todos/create"
        class="text-blue-600 dark:text-blue-400 hover:underline font-medium"
      >
        here
      </RouterLink>
      to create a todo.
    </p>
  </section>
</template>
