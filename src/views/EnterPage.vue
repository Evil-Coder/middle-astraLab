<template>
  <section class="main-page">
    <div class="main-page__container">
      <h1 class="main-page__heading"></h1>
      <h2 class="main-page__subheading"></h2>
      <div class="main-page__buttons">
        <router-link class="main-page__sign-up button" to="/signUp" />
        <router-link class="main-page__sign-in button" to="/signIn" />
      </div>
      <img
        class="main-page__image"
        src="../assets/images/EnterPage/woman.png"
        alt="woman"
      />
    </div>
  </section>
</template>

<script>
export default {
  name: "EnterPage",
};
</script>

<style lang="sass">
.main-page
	background-color: $background-color

	&__container
		display: flex
		flex-direction: column
		align-items: center
		padding: 63px 41px 0

	&__heading
	&__subheading
		margin-top: 17px

	&__buttons
		margin-top: 27px

	&__sign-up
	&__sign-in
		margin-left: 16px

	&__image
		object-fit: contain
</style>
