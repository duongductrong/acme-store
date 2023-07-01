"use client"

import CollectionForm from "../templates/collection-form"

export interface NewCollectionProps {}

const NewCollection = (props: NewCollectionProps) => {
  return <CollectionForm onSubmit={() => console.log("on submit")} />
}

export default NewCollection
