export interface DefaultModel {
  id: number,
  [key: string]: number | string | DefaultModel | DefaultModel[]
}

export interface Ppc {
  id: number,
  nome: string,
  formacao: string,
  semestral: number,
  duracao: number,
  ano: number,
}

export interface Disciplina {
  id: number,
  nome: string,
  periodo: number,
  duracao_aula: number,
  aulas_semana: number,
  ppc: Ppc,
}

export interface Professor {
  id: number,
  nome: string,
  siape: number,
}

export interface Curso {
  id: number,
  ano_ingresso: number,
  semestre_ingresso: number,
  ppc: Ppc,
}

export interface CargaHoraria {
  id: number,
  curso: string,
  professor: string,
  disciplina: string,
  ano: number,
  semestre: number | null,
  periodo: number,
  aulas_semana: number
  duracao_aula: number
  carga_horaria: number
}
