export interface IRol {
	id: string;
	name:  | 'Administrador' | 'Agricultores';
	normalizedName: string;
	concurrencyStamp?: any;
}