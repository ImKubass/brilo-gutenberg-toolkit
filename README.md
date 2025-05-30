# Brilo gutenberg components

## Install
``` sh
npx jsr add @brilo-gutenberg/components
```

or

``` sh
bunx jsr add @brilo-gutenberg/components
```


## Usage

 ```ts
 import { ButtonControl } from '@brilo-gutenberg/components';

 const [button, setButton] = useState({
   title: 'Click me',
   url: 'https://example.com',
   blank: false,
   modalTarget: false,
   modalId: ''
 });

 <ButtonControl
   title="My Button"
   button={button}
   onChange={setButton}
 />
 ```


``` ts
export {default as ButtonControl} from "./components/ButtonControl/ButtonControl"
export {default as ButtonGroupControl} from "./components/ButtonGroupControl/ButtonGroupControl"
export {default as ContentWrapper} from "./components/ContentControl/ContentControl"
export {default as HeaderControl} from "./components/HeaderControl/HeaderControl"
export {default as HeaderControlEdit} from "./components/HeaderControl/HeaderControlEdit"
export {default as HeadingLevelControl} from "./components/HeadingLevelControl/HeadingLevelControl"
export {default as MediaControl} from "./components/MediaControl/MediaControl"
export {default as MediaControlEdit} from "./components/MediaControl/MediaControlEdit"
export {default as PriceControl} from "./components/PriceControl/PriceControl"
export {default as PriceControlEdit} from "./components/PriceControl/PriceControlEdit"
export {default as SelectPostsControl} from "./components/SelectPostsControl/SelectPostsControl"
```
