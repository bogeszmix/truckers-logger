import { ParseMinToHM } from './parse-min-to-hm';

export class GenerateArrayFromArrayJson {
    /**
     *
     * @param arrayObject The array object what should convert to array[array]
     * @param filter Object keys that should be included in export. If it is empty or undefined, all object key
     * will be exported.
     * @param timeToConvertField Flag the time type field, that should be convert to hour:min string
     */
    public static generateArrays(arrayObject: any[], filter?: string[], timeToConvertField?: string): Array<any[]> {
        const arrayOfArrays = [];

        if (arrayObject && arrayObject.length > 0) {
            arrayObject.forEach(arrayElement => {
                const elementKeys = Object.keys(arrayElement);
                const innerObjectElementArray = [];
                for (const item of elementKeys) {
                    if (filter && GenerateArrayFromArrayJson.isKeyInFilter(filter, item)) {
                        if (timeToConvertField && timeToConvertField === item) {
                            innerObjectElementArray.push(ParseMinToHM.parseMinutesToHourMinFormat(arrayElement[item]));
                        } else {
                            innerObjectElementArray.push(arrayElement[item]);
                        }
                    }

                    if (!filter) {
                        innerObjectElementArray.push(arrayElement[item]);
                    }
                }

                arrayOfArrays.push(innerObjectElementArray);

            });

            return arrayOfArrays;
        }

        return null;
    }

    /**
     * 
     * @param filter Object keys that should be included in export. If it is empty or undefined, all object key
     * will be exported.
     * @param currentObjectItem The current item's key. It will be compared with the filter array.
     */
    private static isKeyInFilter(filter: string[], currentObjectItem: string): boolean {

        let foundAKeyInFilter = false;

        filter.forEach(filterElement => {
            if (filterElement === currentObjectItem) {
                foundAKeyInFilter = true;
                return true;
            }
        });

        return foundAKeyInFilter;

    }
}
