<template>
  <section class="sign-in-page">
    <h1 class="sign-in-page__heading heading">Sign In</h1>
    <form class="sign-in-page__form">
      <label class="sign-in-page__label">
        <span class="sign-in-page__label-name">Email</span>
        <input
          class="sign-in-page__input"
          :class="{
            'sign-in-page__input_incorrect': incorrectEmail,
          }"
          type="text"
          v-model="email"
        />
      </label>
      <label class="sign-in-page__label">
        <span class="sign-in-page__label-name">Password</span>
        <input
          ref="password"
          class="sign-in-page__input"
          :class="{
            'sign-in-page__input_incorrect': incorrectPassword,
          }"
          type="password"
          v-model="password"
        />

        <button
          @click.prevent="togglePassword"
          class="sign-in-page__password-button image"
          :class="{ 'sign-in-page__password-button_hide': showPassword }"
        />
      </label>

      <button
        class="sign-in-page__sign-in button"
        :class="{ button_disable: !correctAll }"
        @click.prevent="setMainPage"
      >
        Sign In
      </button>
    </form>
    <p class="sign-in-page__login-offer">Don’t have an account yet?</p>
    <router-link class="sign-in-page__sign-up" to="/sign-up">
      Sign Up
    </router-link>

    <transition name="fade">
      <div class="sign-in-page__notification" v-if="showingNotification">
        <div class="sign-in-page__notification-container">
          <p class="sign-in-page__notification-text">Wrong email or password</p>
          <button
            class="sign-in-page__notification-close"
            @click.prevent="hideNotification"
          >
            <img
              class="sign-in-page__notification-image"
              src="../assets/images/LoginAndRegistrationPage/exit.svg"
              alt="exit"
            />
          </button>
        </div>
      </div>
    </transition>
  </section>
</template>

<script>
import { email, minLength, required } from "vuelidate/lib/validators";

export default {
  name: "SignInPage",
  data() {
    return {
      email: "",
      password: "",

      submitted: false,
      showPassword: false,

      showingNotification: false,
    };
  },
  computed: {
    incorrectEmail() {
      return this.submitted && this.$v.email.$error;
    },
    incorrectPassword() {
      return this.submitted && this.$v.password.$error;
    },
    correctAll() {
      return !this.$v.email.$error && !this.$v.password.$error;
    },
  },
  validations: {
    email: { required, email },
    password: {
      required,
      minLength: minLength(8),
      valid(value) {
        const containsUppercase = value.match(/[A-Z]/g)?.length >= 2;
        const containsSpecial = /[#?!@$%^&*-]/.test(value);
        return containsUppercase && containsSpecial;
      },
    },
  },
  methods: {
    setMainPage() {
      this.handleSubmit();

      if (this.correctAll) {
        this.$router.push("/");
      } else if (!this.showingNotification) {
        this.showNotification();
      }
    },

    showNotification() {
      this.showingNotification = true;
      setTimeout(this.hideNotification, 3000);
    },
    hideNotification() {
      this.showingNotification = false;
    },

    handleSubmit() {
      this.submitted = true;
      this.$v.$touch();
    },

    togglePassword() {
      this.showPassword = !this.showPassword;

      // eslint-disable-next-line no-unused-expressions
      this.showPassword
        ? (this.$refs.password.type = "text")
        : (this.$refs.password.type = "password");
    },
  },
};
</script>

<style lang="sass">
.sign-in-page
	display: flex
	flex-direction: column
	align-items: center
	padding: 65px 13px 34px
	overflow: hidden

	&__heading
	&__form
		margin-top: 20px
		padding: 23px 22px 18px
		background-color: white
		border-radius: 40px

	&__label
		position: relative
		display: inline-block
		width: 100%
		&:not(:first-child)
			margin-top: 24px

	&__label-name
		padding-left: 15px
		font-size: 12px
		font-weight: 600
		font-family: $main-font
		color: $field-name-color
		line-height: 20px

	&__label-warning
		padding-left: 15px
		font-size: 10px
		font-family: $main-font
		color: red
		line-height: 20px

	&__input
		padding-left: 18px
		width: 100%
		height: 36.5px
		background-color: $field-color
		border-radius: 50px
		font-size: 14px
		font-family: $main-font
		line-height: 20px
		color: $field-name-color
		&_incorrect
			background-color: $field-incorrect-color

	&__password-button
		position: absolute
		top: 32px
		right: 15px
		width: 18px
		height: 15px
		background-image: url("../assets/images/LoginAndRegistrationPage/showPassword.svg")
		&_hide
			background-image: url("../assets/images/LoginAndRegistrationPage/hidePassword.svg")

	&__sign-in
		margin-top: 40px
		width: 100%
		height: 48px

	&__login-offer
		margin-top: 20px

	&__sign-up
		font-size: 14px
		font-weight: 500
		font-family: $main-font
		color: $button-color
		text-decoration: underline

	// Notification

	&__notification
		position: absolute
		bottom: 17px
		width: 80%
		height: 48px
		background-color: #FF6683
		border-radius: 50px

	&__notification-container
		display: flex
		align-items: center
		justify-content: center
		position: relative
		width: 100%
		height: 100%

	&__notification-text
		text-align: center
		font-size: 14px
		font-weight: 500
		font-family: $main-font
		color: white

	&__notification-close
		position: absolute
		top: 18px
		right: 20px

	&__notification-image

	// notification animation

.fade-enter-active,
.fade-leave-active
	transition: opacity 0.3s ease-in-out, transform 0.3s ease-in-out
	will-change: transform, opacity

.fade-enter,
.fade-leave-to
	opacity: 0
</style>
