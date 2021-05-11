import { ApolloClient, makeReference } from '@apollo/client';

import { BasicUserDetailsFragment } from '../@types/generated';

interface AddUserToApolloCacheProps {
  user: BasicUserDetailsFragment;
  client: ApolloClient<object>;
}

export const addUserToApolloCache = (props: AddUserToApolloCacheProps) => {
  const { user, client } = props;

  client.cache.modify({
    id: client.cache.identify(makeReference('ROOT_QUERY')),
    fields: {
      currentUser() {
        return user;
      },
    },
  });
};
