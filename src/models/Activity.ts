import { EntityBase } from '../services/generic.service'
import { Client } from './Client'
import { Project } from './Project'

export class Activity extends EntityBase {
	startDate: string = ''
	expectedEndDate: string = ''
	status: string = ''
	description: string = ''
	client?: Client
	project?: Project
}
