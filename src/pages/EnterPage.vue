<template>
  <section class="enter-page">
    <div class="enter-page__container">
      <h1 class="enter-page__heading heading">
        Ready for a great User experience?
      </h1>
      <h2 class="enter-page__subheading">
        Bring your media to the next level!
      </h2>
      <div class="enter-page__buttons">
        <router-link class="enter-page__sign-up button" to="/sign-up">
          Sign Up
        </router-link>
        <router-link class="enter-page__sign-in button" to="/sign-in">
          <img
            class="enter-page__sign-in-image"
            src="../assets/images/EnterPage/arrow.svg"
            alt="arrow"
          />
        </router-link>
      </div>
    </div>
    <img
      class="enter-page__image image"
      src="../assets/images/EnterPage/woman.png"
      alt="woman"
    />
  </section>
</template>

<script>
export default {
  name: "EnterPage",
};
</script>

<style lang="sass">
.enter-page
	display: flex
	flex-direction: column
	justify-content: space-between
	flex-grow: 1

	&__container
		display: flex
		flex-direction: column
		align-items: center
		padding: 63px 41px 0

	&__heading

	&__subheading
		margin-top: 17px
		text-align: center
		font-size: 14px
		font-weight: normal
		font-family: $main-font
		line-height: 20px
		letter-spacing: 0.02em
		color: #3E4462

	&__buttons
		display: flex
		margin-top: 27px

	&__sign-up
		width: 120px
		height: 48px
		background-color: white
		color: black

	&__sign-in
		margin-left: 16px
		width: 48px
		height: 48px

	&__image
		margin-top: 33px
		width: 100%
		max-width: 500px
</style>
