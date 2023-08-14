// const t = {}
// const session = {}
// const createUserProspect = async (groupId) => {
// 	const fixedRequesterField = '360047330612'

// 	let config = {
// 		method: 'post',
// 		url: `https://aaa.zendesk.com/api/v2/users/create_or_update`,
// 		headers: {
// 			Authorization: ' zendeskAuthorizationHeader',
// 		},
// 		data: {
// 			user: {
// 				email: session.emailZendesk,
// 				name: session.nome,
// 				phone: session.phone,
// 				role: 'end-user',
// 				group_id: groupId,
// 			},
// 		},
// 	}

// 	if (!session.metadata) {
// 		session.metadata = {}
// 	}
// 	const createUser = await axios(config)
// 	if (createUser.data) {
// 		session.metadata[
// 			`dataCapture.ticketField.${fixedRequesterField}`
// 		] = `${createUser.data.user.id}`
// 	}
// }

// createUserProspect().catch((error) => {
// 	console.log(error)
// })
