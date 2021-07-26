import { DefinitionList, List } from "../lib/lists";


List(['test1', 'test2', 'test3'])
List(['test1', 'test2', 'test3'], { ordered: true, padding: 4 })

DefinitionList([
  { term: 'Term 1', definition: 'Definition 1'},
  { term: 'Term 2', definition: 'Definition 2'},
  { term: 'Longer Term 3', definition: 'Definition 3'},
  { term: 'Term 4', definition: 'Longer Definition 4'},
], { padding: 4 })