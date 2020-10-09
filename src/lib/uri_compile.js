import uri_resolver from './uri_resolver'

export default async(endpointList, endpoint, opt_prefix) =>{
    return new Promise(async(resolve) => {
        const resolvers = await uri_resolver();
        const prefix = resolvers[opt_prefix];
        
        let final = null;
        let url;
        let method;
        const endpointSplit = endpoint.split(' ');
        if (endpointSplit.length === 2) {
          method = endpointSplit[0];
          url = endpointSplit[1];
          url = prefix + url;
          return resolve({ url, method });
        }
    
        Object.values(endpointList).find(item => {
          url = item;
          method = 'GET';
          const paramsArray = item.split(' ');
          if (paramsArray.length === 2) {
            method = paramsArray[0];
            url = paramsArray[1];
          }
          if (endpoint === url) {
            url = prefix + url;
            return (final = { url, method });
          }
        });
        return resolve(final);
    })
}