import React, { useState } from 'react'
import { Grid, Header, Button, Tab, Card, Image } from 'semantic-ui-react'
import PhotoUploadWidget from '../../../app/common/photos/PhotoUploadWidget'

function PhotosTab({ profile, isCurrentUser }) {
	const [editMode, setEditMode] = useState(true)
	return (
		<Tab.Pane>
			<Grid>
				<Grid.Column width={16}>
					<Header floated='left' icon='user' content={`Photos`} />
					{isCurrentUser && (
						<Button
							onClick={() => setEditMode(!editMode)}
							floated='right'
							basic
							content={editMode ? 'Cancel' : 'Add Photo'}
						/>
					)}
				</Grid.Column>
				<Grid.Column width={16}>
					{editMode ? (
						<PhotoUploadWidget />
					) : (
						<Card.Group itemsPerRow={5}>
							<Card>
								<Image src={`/assets/user.png`} />
								<Button.Group fluid width={2}>
									<Button basic color='green' content='Main' />
									<Button basic color='red' content='Tash' />
								</Button.Group>
							</Card>
						</Card.Group>
					)}
				</Grid.Column>
			</Grid>
		</Tab.Pane>
	)
}

export default PhotosTab
