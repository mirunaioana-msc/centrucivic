import { OrderDirection } from "../../common/enums/OrderDirection.enum";
import { PaginatedEntity } from "../../common/interfaces/PaginatedEntity.interface";
import { IPracticeProgram } from "../../common/interfaces/PracticeProgram.interface";


export const practiceProgramsSlice = (set: any) => ({
  practicePrograms: {
    items: [],
    meta: {
      currentPage: 1,
      itemCount: 0,
      itemsPerPage: 10,
      totalItems: 0,
      totalPages: 1,
      orderByColumn: 'id',
      orderDirection: OrderDirection.ASC,
    },
  },
  setPracticePrograms: (practicePrograms: PaginatedEntity<IPracticeProgram>) => {
    set({ practicePrograms });
  },
});

export default { practiceProgramsSlice };
