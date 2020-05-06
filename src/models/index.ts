export interface Ppc {
  id: number,
  nome: string,
  formacao: string,
  semestral: number,
  duracao: number,
  ano: number,
  ppc: string,
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

export interface Turma {
  id: number,
  ano_ingresso: number,
  semestre_ingresso: number,
  simulado: boolean,
  semestral: boolean,
  duracao: number,
  ppc: string,
  ppc_id: number,
}

export interface CargaHoraria {
  id: number,
  turma: string,
  professor: string,
  disciplina: string,
  ano: number,
  semestre: number | null,
  periodo: number,
  aulas_semana: number,
  duracao_aula: number,
  carga_horaria: number,
  disciplina_id: number,
  turma_id: number,
  professor_id: number,
}
