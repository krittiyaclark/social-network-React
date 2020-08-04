import React, { useState } from 'react'
import { Menu, Container, Button } from 'semantic-ui-react'
import { NavLink, useHistory } from 'react-router-dom'
import SignedOutMenu from '../SignedOutMenu'
import SignedInMenu from '../SignedInMenu'

function NavBar({ setFormOpen }) {
	const history = useHistory()
	const [authenticated, setAuthenticated] = useState(false)

	function handleSignOut() {
		setAuthenticated(false)
		history.push('/')
	}

	return (
		<Menu inverted fixed='top'>
			<Container>
				<Menu.Item as={NavLink} exact to='/' header>
					<img src='/assets/logo.png' alt='logo' style={{ marginRight: 15 }} />
					Social Network
				</Menu.Item>
				<Menu.Item as={NavLink} to='/events' name='Events' />
				{authenticated && (
					<Menu.Item as={NavLink} to='/createEvent'>
						<Button
							onClick={() => setFormOpen(true)}
							positive
							inverted
							content='Create Event'></Button>
					</Menu.Item>
				)}
				{authenticated ? (
					<SignedInMenu signOut={handleSignOut} />
				) : (
					<SignedOutMenu setAuthenticated={setAuthenticated} />
				)}
			</Container>
		</Menu>
	)
}

export default NavBar
