import React from 'react'
import { Menu, Button } from 'semantic-ui-react'
import { NavLink } from 'react-router-dom'

function SignedOutMenu({ setAuthenticated }) {
	return (
		<Menu.Item position='right'>
			<Menu.Item as={NavLink} to='/login'>
				<Button basic content='Login' />
			</Menu.Item>
			<Menu.Item as={NavLink} to='/register'>
				<Button basic content='Register' />
			</Menu.Item>
		</Menu.Item>
	)
}

export default SignedOutMenu
