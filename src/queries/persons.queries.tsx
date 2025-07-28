import { personAdapter } from "@/adapters";
import type { TCreatePerson } from "@/models";
import { PersonsServices } from "@/services/persons.service";
import { addPerson, setPersons } from "@/store/features/persons/personSlice";
import { useAppDispatch } from "@/store/hooks";

export function usePersonsQueries() {
  const dispatch = useAppDispatch();

  const fetchPersons = async () => {
    try {
      const apiUserResponse = await PersonsServices.getAll();
      const adaptedPersons = apiUserResponse.map((apiPerson) =>
        personAdapter(apiPerson)
      );
      dispatch(setPersons(adaptedPersons));
    } catch (error) {
      console.log("Error fetching persons", error);
      throw error;
    }
  };

  const createPerson = async (body: TCreatePerson) => {
    try {
      const newPerson = await PersonsServices.create(body);
      const adaptedNewPerson = personAdapter(newPerson);
      dispatch(addPerson(adaptedNewPerson));
    } catch (error) {
      console.log("Error creatin person", error);
      throw error;
    }
  };

  return { fetchPersons, createPerson };
}
