<template>
  <section class="main-page">
    <h1 class="main-page__heading heading">Hello, John Doe!</h1>
    <img
      class="main-page__image image"
      src="../assets/images/MainPage/woman.png"
      alt="woman"
    />
  </section>
</template>

<script>
export default {
  name: "MainPage",
};
</script>

<style lang="sass">
.main-page
	display: flex
	flex-direction: column
	justify-content: space-between
	flex-grow: 1
	padding-top: 148px
	overflow: hidden

	&__heading
	&__image
		width: 944px
		object-position: -300px
</style>
