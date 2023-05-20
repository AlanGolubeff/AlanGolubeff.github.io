import { getFirestore, collection, getDocs, query, where, orderBy } from "firebase/firestore";

export default async function getOrders(ordersFilter) {
    const db = getFirestore();
    const ordersCollection = collection(db, 'Orders');
    const ordersQuery = query(ordersCollection, orderBy('date', 'desc'));
    const ordersSnapshot = await getDocs(ordersQuery);
    const ordersList = ordersSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    return ordersList;
}