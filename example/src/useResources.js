import useDefer from 'use-defer';
import api from './api';

const useResources = () => {
  const { execute: reload, value: resources, status } = useDefer(api.get, [], []);
  const { execute: create } = useDefer(resource => api.post(resource).then(reload));
  const { execute: remove } = useDefer(id => api.delete(id).then(reload));

  return { resources, status, create, remove };
};

export default useResources;