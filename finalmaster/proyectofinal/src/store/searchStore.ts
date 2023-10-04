import { defineStore } from 'pinia';

export const useSearchStore = defineStore('search', {
  state: () => ({
    resultados: [] as any[], 
  }),
  actions: {
    actualizarResultados(nuevosResultados: any[]) {
      this.resultados = nuevosResultados;
    },
    buscarAnuncioPorId(id: string) {
    
      const anuncio = this.resultados.find((anuncio) => anuncio.id === id);
      return anuncio;
    },
  },
});