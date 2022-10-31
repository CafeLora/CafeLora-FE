import { IColumnsGrid } from '../interfaces/grid.interface';

export const urlConstants = {
  //roles

  ADMINISTRADOR: 'Profile',
  AGRICULTORES: 'Agricultores',
  PROFILE_AGRICULTOR: 'ProfileAgricultor',


  //funcionalidades



}

export const rol = {
  ADMINISTRADOR: 'Administrador',
  AGRICULTOR: 'Agricultores',
}

export const columnsRolListSensor: IColumnsGrid[] = [
  {
    field: 'id',
    title: 'Código',
    type: 'text'
  },
  {
    field: 'temperatura',
    title: 'Temperatura',
    type: 'text'
  },
  {
    field: 'humedad',
    title: 'Humedad',
    type: 'text'
  },
  {
    field: 'ph',
    title: 'PH',
    type: 'text'
  },  
  {
    field: 'fecha',
    title: 'Fecha',
    type: 'text'
  }
]

export const columnsRolListColor: IColumnsGrid[] = [
  {
    field: 'id',
    title: 'Código',
    type: 'text'
  },
  {
    field: 'color',
    title: 'Color',
    type: 'text'
  },  
  {
    field: 'fecha',
    title: 'Fecha',
    type: 'text'
  }
]


export const columnsRolList: IColumnsGrid[] = [
  {
    field: 'codigo',
    title: 'Código',
    type: 'text'
  },
  {
    field: 'nombre',
    title: 'Nombre',
    type: 'text'
  },
  {
    field: 'especialidad',
    title: 'Especialidad',
    type: 'text'
  },
  {
    field: 'email',
    title: 'Correo electrónico',
    type: 'text'
  },
  {
    field: 'phoneNumber',
    title: 'Número de teléfono',
    type: 'text'
  },
  {
    field: 'fechaNacimiento',
    title: 'Edad',
    type: 'text'
  }
]
export const columnsRolList2: IColumnsGrid[] = [
  {
    field: 'codigo',
    title: 'Código',
    type: 'text'
  },
  {
    field: 'nombre',
    title: 'Nombre',
    type: 'text'
  },
  {
    field: 'email',
    title: 'Correo electrónico',
    type: 'text'
  },
  {
    field: 'phoneNumber',
    title: 'Número de teléfono',
    type: 'text'
  },
  {
    field: 'fechaNacimiento',
    title: 'Edad',
    type: 'text'
  }
]







export const actions = {
  DELETE: 'delete',
  EDIT: 'edit',
}

export const entity = {
  USER: 'usuario',
}


export const BASE_URL = "http://localhost:55017/api/";
//export const BASE_URL = "https://cafe-lora.azurewebsites.net/api/";
