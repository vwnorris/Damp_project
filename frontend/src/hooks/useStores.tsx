import { useContext } from 'react';
import { defaultContext } from '../store';

export const useStores = () => useContext(defaultContext);