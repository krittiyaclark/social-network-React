import React from 'react'
import ModalWrapper from '../../app/common/modals/modalWrapper'
import { Formik, Form } from 'formik'
import * as Yup from 'yup'
import MyTextInput from '../../app/common/form/MyTextInput'
import { Button, Label, Divider } from 'semantic-ui-react'
import { useDispatch } from 'react-redux'
import { closeModal } from '../../app/common/modals/modalReducer'
import { registerInFirebase } from '../../app/firestore/firebaseService'
import SocialLogin from './SocialLogin'

function LoginForm() {
	const dispatch = useDispatch()

	return (
		<ModalWrapper size='mini' header='Sign in to Social Network'>
			<Formik
				initialValues={{ email: '', password: '' }}
				validationSchema={Yup.object({
					email: Yup.string().required().email(),
					password: Yup.string().required(),
				})}
				onSubmit={async (values, { setSubmitting, setErrors }) => {
					try {
						await registerInFirebase(values)
						setSubmitting(false)
						dispatch(closeModal())
					} catch (error) {
						setErrors({ auth: 'Problem with useramen or password' })
						setSubmitting(false)
					}
				}}>
				{({ isSubmitting, isValid, dirty, errors }) => (
					<Form className='ui form'>
						<MyTextInput name='email' placeholder='Email Address' />
						<MyTextInput
							name='password'
							placeholder='Password'
							type='password'
						/>
						{errors.auth && (
							<Label
								basic
								color='red'
								style={{ marginBottom: 10 }}
								content={errors.auth}
							/>
						)}
						<Button
							loading={isSubmitting}
							disabled={!isValid || !dirty || isSubmitting}
							type='submit'
							fluid
							size='large'
							color='teal'
							content='Login'
						/>
						<Divider horizontal>Or</Divider>
						<SocialLogin />
					</Form>
				)}
			</Formik>
		</ModalWrapper>
	)
}

export default LoginForm
