import { IDataSource } from '../interfaces/dataSource';
import { IUser } from '../interfaces/user.interface';
import { IUmbralMaxTemperatura } from '../interfaces/umbralMaxTemperatura.interface';
import { IUmbralMinTemperatura } from '../interfaces/umbralMinTemperatura.interface';
import { IUmbralMaxHumedad } from '../interfaces/umbralMaxHumedad.interface';
import { IUmbralMinHumedad } from '../interfaces/umbralMinHumedad.interface';
import { IUmbralMaxPh } from '../interfaces/umbralMaxPh.interface';
import { IUmbralMinPh } from '../interfaces/umbralMinPh.interface';
import { IUmbralMaxColor } from '../interfaces/umbralMaxColor.interface';
import { IUmbralMinColor } from '../interfaces/umbralMinColor.interface';
export const emptyUser = (): IUser => ({
  nombres: '',
	apellidos: '',
	nombreCompleto: '',
	password: '',
	token: '',
	email: '',
	username: '',
	imagen: '',
	phoneNumber: '',
	fechaNacimiento: null,
	especialidad: '',
	rol: null
});

export const emptyUmbralMaxTemp = (): IUmbralMaxTemperatura => ({
	
	id:'',
	ultimo:'',
})

export const emptyUmbralMinTemp = (): IUmbralMinTemperatura => ({
	
	id:'',
	ultimo:'',
})

export const emptyUmbralMaxHumedad = (): IUmbralMaxHumedad => ({
	
	id:'',
	ultimo:'',
})

export const emptyUmbralMinHumedad = (): IUmbralMinHumedad => ({
	
	id:'',
	ultimo:'',
})

export const emptyUmbralMaxPh = (): IUmbralMaxPh => ({
	
	id:'',
	ultimo:'',
})

export const emptyUmbralMinPh = (): IUmbralMinPh => ({
	
	id:'',
	ultimo:'',
})

export const emptyUmbralMaxColor = (): IUmbralMaxColor=> ({
	
	id:'',
	ultimo:'',
})

export const emptyUmbralMinColor = (): IUmbralMinColor => ({
	
	id:'',
	ultimo:'',
})





export const emptyDataSource = <T>(): IDataSource<T> => ({
	listaRecords: [],
  numeroPaginas: 0,
  totalRecords: 0,
})




