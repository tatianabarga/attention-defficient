import { getItemsByList } from './itemData';
import { getSingleList } from './listData';

const viewListDetails = (listFirebaseKey) => new Promise((resolve, reject) => {
  getSingleList(listFirebaseKey)
    .then((listObject) => {
      getItemsByList(listFirebaseKey)
        .then((itemObject) => {
          resolve({ itemObject, ...listObject });
        });
    }).catch((error) => reject(error));
});

export default viewListDetails;
