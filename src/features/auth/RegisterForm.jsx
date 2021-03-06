import React from 'react'
import { Formik, Form } from 'formik'
import * as Yup from 'yup'
import MyTextInput from '../../app/common/form/MyTextInput'
import { Button, Label, Divider } from 'semantic-ui-react'
import { registerInFirebase } from '../../app/firestore/firebaseService'
import SocialLogin from './SocialLogin'
import { useHistory } from 'react-router-dom'

export default function RegisterForm() {
	const history = useHistory()

	return (
		<Formik
			initialValues={{ displayName: '', email: '', password: '' }}
			validationSchema={Yup.object({
				displayName: Yup.string().required(),
				email: Yup.string().required().email(),
				password: Yup.string().required(),
			})}
			onSubmit={async (values, { setSubmitting, setErrors }) => {
				try {
					await registerInFirebase(values)
					setSubmitting(false)
					history.push('/events')
					// dispatch(closeModal())
				} catch (error) {
					setErrors({ auth: error.message })
					setSubmitting(false)
				}
			}}>
			{({ isSubmitting, isValid, dirty, errors }) => (
				<Form className='ui form'>
					<MyTextInput
						name='displayName'
						size='massive'
						placeholder='DisplayName*'
					/>
					<MyTextInput name='email' placeholder='Email Address*' />
					<MyTextInput
						name='password'
						placeholder='Password*'
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
						size='massive'
						color='teal'
						content='Register'
					/>
					<Divider horizontal>Or</Divider>
					<SocialLogin />
				</Form>
			)}
		</Formik>
	)
}
