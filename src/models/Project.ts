import { EntityBase } from '../services/generic.service'
import { Client } from './Client'

export class Project extends EntityBase {
	projectName: string = ''
	startDate: string = ''
	expectedEndDate: string = ''
	projectStatus: string = ''
	client?: Client
}
