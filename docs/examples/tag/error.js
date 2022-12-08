// @flow strict
import { type Node } from 'react';
import { Flex, Tag } from 'gestalt';

export default function Example(): Node {
  return (
    <Flex alignItems="center" height="100%" justifyContent="center" width="100%">
      <Tag
        errorMessage="There is an error!"
        onRemove={() => {}}
        removeIconAccessibilityLabel="Remove tag"
        text="Error tag"
      />
    </Flex>
  );
}
