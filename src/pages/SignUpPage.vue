<template>
  <section class="sign-up-page">
    <h1 class="sign-up-page__heading heading">Sign Up</h1>
    <form class="sign-up-page__form">
      <label class="sign-up-page__label">
        <span class="sign-up-page__label-name">Full name</span>
        <input
          class="sign-up-page__input"
          :class="{
            'sign-up-page__input_incorrect': incorrectName,
          }"
          type="text"
          v-model="name"
        />
        <span class="sign-up-page__label-warning" v-if="incorrectName">
          Enter valid name
        </span>
      </label>
      <label class="sign-up-page__label">
        <span class="sign-up-page__label-name">Email</span>
        <input
          class="sign-up-page__input"
          :class="{
            'sign-up-page__input_incorrect': incorrectEmail,
          }"
          type="text"
          v-model="email"
        />
        <span class="sign-up-page__label-warning" v-if="incorrectEmail">
          Enter valid email
        </span>
      </label>
      <label class="sign-up-page__label">
        <span class="sign-up-page__label-name">Password</span>
        <input
          ref="password"
          class="sign-up-page__input"
          :class="{
            'sign-up-page__input_incorrect': incorrectPassword,
          }"
          type="password"
          v-model="password"
        />
        <span class="sign-up-page__label-warning" v-if="incorrectPassword">
          Enter valid password
        </span>

        <button
          @click.prevent="togglePassword"
          class="sign-up-page__password-button image"
          :class="{ 'sign-up-page__password-button_hide': showPassword }"
        />
        <div class="sign-up-page__password-prompt-container">
          <div class="sign-up-page__password-prompt-wrapper">
            <button
              class="sign-up-page__password-prompt-button image"
              @click.prevent="togglePasswordPrompt"
            />
            <div
              class="sign-up-page__password-prompt image"
              v-if="showPasswordPrompt"
            >
              Password must contain 8+ symbols, 1 special and 2 capital letters
            </div>
          </div>
        </div>
      </label>
      <label class="sign-up-page__label">
        <span class="sign-up-page__label-name">Repeat password</span>
        <input
          ref="passwordRepeat"
          class="sign-up-page__input"
          :class="{
            'sign-up-page__input_incorrect': incorrectRepeatPassword,
          }"
          type="password"
          v-model="confirmPassword"
        />
        <span
          class="sign-up-page__label-warning"
          v-if="incorrectRepeatPassword"
        >
          Password mismatch
        </span>

        <button
          @click.prevent="toggleRepeatPassword"
          class="sign-up-page__password-button image"
          :class="{ 'sign-up-page__password-button_hide': showRepeatPassword }"
        />
      </label>
      <button
        class="sign-up-page__sign-up button"
        :class="{ button_disable: !correctAll }"
        @click.prevent="setMainPage"
      >
        Sign Up
      </button>
    </form>
    <p class="sign-up-page__login-offer">Already have an account?</p>
    <router-link class="sign-up-page__sign-in" to="/sign-in">
      Sign In
    </router-link>
  </section>
</template>

<script>
import { required, email, minLength, sameAs } from "vuelidate/lib/validators";

export default {
  name: "SignUpPage",
  data() {
    return {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",

      submitted: false,

      showPassword: false,
      showRepeatPassword: false,
      showPasswordPrompt: false,
    };
  },
  computed: {
    incorrectName() {
      return this.submitted && !this.$v.name.required;
    },
    incorrectEmail() {
      return this.submitted && this.$v.email.$error;
    },
    incorrectPassword() {
      return this.submitted && this.$v.password.$error;
    },
    incorrectRepeatPassword() {
      return (
        this.submitted &&
        (!this.$v.confirmPassword.sameAsPassword ||
          !this.$v.confirmPassword.required)
      );
    },
    correctAll() {
      return (
        this.$v.name.required &&
        !this.$v.email.$error &&
        !this.$v.password.$error &&
        this.$v.confirmPassword.sameAsPassword
      );
    },
  },
  validations: {
    name: { required },
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
    confirmPassword: { required, sameAsPassword: sameAs("password") },
  },
  methods: {
    setMainPage() {
      this.handleSubmit();

      if (this.correctAll) {
        this.$router.push("/");
      }
    },

    togglePasswordPrompt() {
      this.showPasswordPrompt = !this.showPasswordPrompt;
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
    toggleRepeatPassword() {
      this.showRepeatPassword = !this.showRepeatPassword;

      // eslint-disable-next-line no-unused-expressions
      this.showRepeatPassword
        ? (this.$refs.passwordRepeat.type = "text")
        : (this.$refs.passwordRepeat.type = "password");
    },
  },
};
</script>

<style lang="sass">
.sign-up-page
	display: flex
	flex-direction: column
	align-items: center
	padding: 65px 13px 34px

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

	&__password-prompt-container
		position: absolute
		top: 0
		right: 20px

	&__password-prompt-wrapper
		position: relative
		width: 100%
		height: 100%

	&__password-prompt-button
		width: 11.5px
		height: 11.5px
		background-image: url("../assets/images/LoginAndRegistrationPage/prompt.svg")

	&__password-prompt
		position: absolute
		top: -40px
		left: -170px
		display: flex
		align-items: center
		justify-content: center
		padding: 6px 11px
		width: 184px
		background-color: #1E1A3E
		box-shadow: 0 10px 36px rgba(0, 0, 0, 0.1)
		border-radius: 8px
		text-align: center
		font-size: 10px
		font-weight: normal
		font-family: $main-font
		color: #F3F3F3
		line-height: 14px
		letter-spacing: -0.4px

	&__sign-up
		margin-top: 40px
		width: 100%
		height: 48px

	&__login-offer
		margin-top: 20px

	&__sign-in
		font-size: 14px
		font-weight: 500
		font-family: $main-font
		color: $button-color
		text-decoration: underline
</style>
