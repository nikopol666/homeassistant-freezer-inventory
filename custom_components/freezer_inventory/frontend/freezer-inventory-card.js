function e(e,t,o,r){var i,s=arguments.length,n=s<3?t:null===r?r=Object.getOwnPropertyDescriptor(t,o):r;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)n=Reflect.decorate(e,t,o,r);else for(var a=e.length-1;a>=0;a--)(i=e[a])&&(n=(s<3?i(n):s>3?i(t,o,n):i(t,o))||n);return s>3&&n&&Object.defineProperty(t,o,n),n}"function"==typeof SuppressedError&&SuppressedError;const t=globalThis,o=t.ShadowRoot&&(void 0===t.ShadyCSS||t.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,r=Symbol(),i=new WeakMap;let s=class{constructor(e,t,o){if(this._$cssResult$=!0,o!==r)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=e,this.t=t}get styleSheet(){let e=this.o;const t=this.t;if(o&&void 0===e){const o=void 0!==t&&1===t.length;o&&(e=i.get(t)),void 0===e&&((this.o=e=new CSSStyleSheet).replaceSync(this.cssText),o&&i.set(t,e))}return e}toString(){return this.cssText}};const n=(e,...t)=>{const o=1===e.length?e[0]:t.reduce((t,o,r)=>t+(e=>{if(!0===e._$cssResult$)return e.cssText;if("number"==typeof e)return e;throw Error("Value passed to 'css' function must be a 'css' function result: "+e+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(o)+e[r+1],e[0]);return new s(o,e,r)},a=o?e=>e:e=>e instanceof CSSStyleSheet?(e=>{let t="";for(const o of e.cssRules)t+=o.cssText;return(e=>new s("string"==typeof e?e:e+"",void 0,r))(t)})(e):e,{is:c,defineProperty:l,getOwnPropertyDescriptor:d,getOwnPropertyNames:u,getOwnPropertySymbols:h,getPrototypeOf:p}=Object,m=globalThis,f=m.trustedTypes,g=f?f.emptyScript:"",_=m.reactiveElementPolyfillSupport,v=(e,t)=>e,k={toAttribute(e,t){switch(t){case Boolean:e=e?g:null;break;case Object:case Array:e=null==e?e:JSON.stringify(e)}return e},fromAttribute(e,t){let o=e;switch(t){case Boolean:o=null!==e;break;case Number:o=null===e?null:Number(e);break;case Object:case Array:try{o=JSON.parse(e)}catch(e){o=null}}return o}},w=(e,t)=>!c(e,t),b={attribute:!0,type:String,converter:k,reflect:!1,useDefault:!1,hasChanged:w};Symbol.metadata??=Symbol("metadata"),m.litPropertyMetadata??=new WeakMap;let y=class extends HTMLElement{static addInitializer(e){this._$Ei(),(this.l??=[]).push(e)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(e,t=b){if(t.state&&(t.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(e)&&((t=Object.create(t)).wrapped=!0),this.elementProperties.set(e,t),!t.noAccessor){const o=Symbol(),r=this.getPropertyDescriptor(e,o,t);void 0!==r&&l(this.prototype,e,r)}}static getPropertyDescriptor(e,t,o){const{get:r,set:i}=d(this.prototype,e)??{get(){return this[t]},set(e){this[t]=e}};return{get:r,set(t){const s=r?.call(this);i?.call(this,t),this.requestUpdate(e,s,o)},configurable:!0,enumerable:!0}}static getPropertyOptions(e){return this.elementProperties.get(e)??b}static _$Ei(){if(this.hasOwnProperty(v("elementProperties")))return;const e=p(this);e.finalize(),void 0!==e.l&&(this.l=[...e.l]),this.elementProperties=new Map(e.elementProperties)}static finalize(){if(this.hasOwnProperty(v("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(v("properties"))){const e=this.properties,t=[...u(e),...h(e)];for(const o of t)this.createProperty(o,e[o])}const e=this[Symbol.metadata];if(null!==e){const t=litPropertyMetadata.get(e);if(void 0!==t)for(const[e,o]of t)this.elementProperties.set(e,o)}this._$Eh=new Map;for(const[e,t]of this.elementProperties){const o=this._$Eu(e,t);void 0!==o&&this._$Eh.set(o,e)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(e){const t=[];if(Array.isArray(e)){const o=new Set(e.flat(1/0).reverse());for(const e of o)t.unshift(a(e))}else void 0!==e&&t.push(a(e));return t}static _$Eu(e,t){const o=t.attribute;return!1===o?void 0:"string"==typeof o?o:"string"==typeof e?e.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(e=>this.enableUpdating=e),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(e=>e(this))}addController(e){(this._$EO??=new Set).add(e),void 0!==this.renderRoot&&this.isConnected&&e.hostConnected?.()}removeController(e){this._$EO?.delete(e)}_$E_(){const e=new Map,t=this.constructor.elementProperties;for(const o of t.keys())this.hasOwnProperty(o)&&(e.set(o,this[o]),delete this[o]);e.size>0&&(this._$Ep=e)}createRenderRoot(){const e=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return((e,r)=>{if(o)e.adoptedStyleSheets=r.map(e=>e instanceof CSSStyleSheet?e:e.styleSheet);else for(const o of r){const r=document.createElement("style"),i=t.litNonce;void 0!==i&&r.setAttribute("nonce",i),r.textContent=o.cssText,e.appendChild(r)}})(e,this.constructor.elementStyles),e}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(e=>e.hostConnected?.())}enableUpdating(e){}disconnectedCallback(){this._$EO?.forEach(e=>e.hostDisconnected?.())}attributeChangedCallback(e,t,o){this._$AK(e,o)}_$ET(e,t){const o=this.constructor.elementProperties.get(e),r=this.constructor._$Eu(e,o);if(void 0!==r&&!0===o.reflect){const i=(void 0!==o.converter?.toAttribute?o.converter:k).toAttribute(t,o.type);this._$Em=e,null==i?this.removeAttribute(r):this.setAttribute(r,i),this._$Em=null}}_$AK(e,t){const o=this.constructor,r=o._$Eh.get(e);if(void 0!==r&&this._$Em!==r){const e=o.getPropertyOptions(r),i="function"==typeof e.converter?{fromAttribute:e.converter}:void 0!==e.converter?.fromAttribute?e.converter:k;this._$Em=r;const s=i.fromAttribute(t,e.type);this[r]=s??this._$Ej?.get(r)??s,this._$Em=null}}requestUpdate(e,t,o,r=!1,i){if(void 0!==e){const s=this.constructor;if(!1===r&&(i=this[e]),o??=s.getPropertyOptions(e),!((o.hasChanged??w)(i,t)||o.useDefault&&o.reflect&&i===this._$Ej?.get(e)&&!this.hasAttribute(s._$Eu(e,o))))return;this.C(e,t,o)}!1===this.isUpdatePending&&(this._$ES=this._$EP())}C(e,t,{useDefault:o,reflect:r,wrapped:i},s){o&&!(this._$Ej??=new Map).has(e)&&(this._$Ej.set(e,s??t??this[e]),!0!==i||void 0!==s)||(this._$AL.has(e)||(this.hasUpdated||o||(t=void 0),this._$AL.set(e,t)),!0===r&&this._$Em!==e&&(this._$Eq??=new Set).add(e))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(e){Promise.reject(e)}const e=this.scheduleUpdate();return null!=e&&await e,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(const[e,t]of this._$Ep)this[e]=t;this._$Ep=void 0}const e=this.constructor.elementProperties;if(e.size>0)for(const[t,o]of e){const{wrapped:e}=o,r=this[t];!0!==e||this._$AL.has(t)||void 0===r||this.C(t,void 0,o,r)}}let e=!1;const t=this._$AL;try{e=this.shouldUpdate(t),e?(this.willUpdate(t),this._$EO?.forEach(e=>e.hostUpdate?.()),this.update(t)):this._$EM()}catch(t){throw e=!1,this._$EM(),t}e&&this._$AE(t)}willUpdate(e){}_$AE(e){this._$EO?.forEach(e=>e.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(e)),this.updated(e)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(e){return!0}update(e){this._$Eq&&=this._$Eq.forEach(e=>this._$ET(e,this[e])),this._$EM()}updated(e){}firstUpdated(e){}};y.elementStyles=[],y.shadowRootOptions={mode:"open"},y[v("elementProperties")]=new Map,y[v("finalized")]=new Map,_?.({ReactiveElement:y}),(m.reactiveElementVersions??=[]).push("2.1.2");const B=globalThis,C=e=>e,$=B.trustedTypes,x=$?$.createPolicy("lit-html",{createHTML:e=>e}):void 0,P="$lit$",z=`lit$${Math.random().toFixed(9).slice(2)}$`,M="?"+z,A=`<${M}>`,S=document,E=()=>S.createComment(""),T=e=>null===e||"object"!=typeof e&&"function"!=typeof e,L=Array.isArray,I="[ \t\n\f\r]",N=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,O=/-->/g,D=/>/g,R=RegExp(`>|${I}(?:([^\\s"'>=/]+)(${I}*=${I}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`,"g"),j=/'/g,U=/"/g,F=/^(?:script|style|textarea|title)$/i,W=(e=>(t,...o)=>({_$litType$:e,strings:t,values:o}))(1),q=Symbol.for("lit-noChange"),H=Symbol.for("lit-nothing"),V=new WeakMap,X=S.createTreeWalker(S,129);function Z(e,t){if(!L(e)||!e.hasOwnProperty("raw"))throw Error("invalid template strings array");return void 0!==x?x.createHTML(t):t}const K=(e,t)=>{const o=e.length-1,r=[];let i,s=2===t?"<svg>":3===t?"<math>":"",n=N;for(let t=0;t<o;t++){const o=e[t];let a,c,l=-1,d=0;for(;d<o.length&&(n.lastIndex=d,c=n.exec(o),null!==c);)d=n.lastIndex,n===N?"!--"===c[1]?n=O:void 0!==c[1]?n=D:void 0!==c[2]?(F.test(c[2])&&(i=RegExp("</"+c[2],"g")),n=R):void 0!==c[3]&&(n=R):n===R?">"===c[0]?(n=i??N,l=-1):void 0===c[1]?l=-2:(l=n.lastIndex-c[2].length,a=c[1],n=void 0===c[3]?R:'"'===c[3]?U:j):n===U||n===j?n=R:n===O||n===D?n=N:(n=R,i=void 0);const u=n===R&&e[t+1].startsWith("/>")?" ":"";s+=n===N?o+A:l>=0?(r.push(a),o.slice(0,l)+P+o.slice(l)+z+u):o+z+(-2===l?t:u)}return[Z(e,s+(e[o]||"<?>")+(2===t?"</svg>":3===t?"</math>":"")),r]};class Q{constructor({strings:e,_$litType$:t},o){let r;this.parts=[];let i=0,s=0;const n=e.length-1,a=this.parts,[c,l]=K(e,t);if(this.el=Q.createElement(c,o),X.currentNode=this.el.content,2===t||3===t){const e=this.el.content.firstChild;e.replaceWith(...e.childNodes)}for(;null!==(r=X.nextNode())&&a.length<n;){if(1===r.nodeType){if(r.hasAttributes())for(const e of r.getAttributeNames())if(e.endsWith(P)){const t=l[s++],o=r.getAttribute(e).split(z),n=/([.?@])?(.*)/.exec(t);a.push({type:1,index:i,name:n[2],strings:o,ctor:"."===n[1]?te:"?"===n[1]?oe:"@"===n[1]?re:ee}),r.removeAttribute(e)}else e.startsWith(z)&&(a.push({type:6,index:i}),r.removeAttribute(e));if(F.test(r.tagName)){const e=r.textContent.split(z),t=e.length-1;if(t>0){r.textContent=$?$.emptyScript:"";for(let o=0;o<t;o++)r.append(e[o],E()),X.nextNode(),a.push({type:2,index:++i});r.append(e[t],E())}}}else if(8===r.nodeType)if(r.data===M)a.push({type:2,index:i});else{let e=-1;for(;-1!==(e=r.data.indexOf(z,e+1));)a.push({type:7,index:i}),e+=z.length-1}i++}}static createElement(e,t){const o=S.createElement("template");return o.innerHTML=e,o}}function Y(e,t,o=e,r){if(t===q)return t;let i=void 0!==r?o._$Co?.[r]:o._$Cl;const s=T(t)?void 0:t._$litDirective$;return i?.constructor!==s&&(i?._$AO?.(!1),void 0===s?i=void 0:(i=new s(e),i._$AT(e,o,r)),void 0!==r?(o._$Co??=[])[r]=i:o._$Cl=i),void 0!==i&&(t=Y(e,i._$AS(e,t.values),i,r)),t}class G{constructor(e,t){this._$AV=[],this._$AN=void 0,this._$AD=e,this._$AM=t}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(e){const{el:{content:t},parts:o}=this._$AD,r=(e?.creationScope??S).importNode(t,!0);X.currentNode=r;let i=X.nextNode(),s=0,n=0,a=o[0];for(;void 0!==a;){if(s===a.index){let t;2===a.type?t=new J(i,i.nextSibling,this,e):1===a.type?t=new a.ctor(i,a.name,a.strings,this,e):6===a.type&&(t=new ie(i,this,e)),this._$AV.push(t),a=o[++n]}s!==a?.index&&(i=X.nextNode(),s++)}return X.currentNode=S,r}p(e){let t=0;for(const o of this._$AV)void 0!==o&&(void 0!==o.strings?(o._$AI(e,o,t),t+=o.strings.length-2):o._$AI(e[t])),t++}}class J{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(e,t,o,r){this.type=2,this._$AH=H,this._$AN=void 0,this._$AA=e,this._$AB=t,this._$AM=o,this.options=r,this._$Cv=r?.isConnected??!0}get parentNode(){let e=this._$AA.parentNode;const t=this._$AM;return void 0!==t&&11===e?.nodeType&&(e=t.parentNode),e}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(e,t=this){e=Y(this,e,t),T(e)?e===H||null==e||""===e?(this._$AH!==H&&this._$AR(),this._$AH=H):e!==this._$AH&&e!==q&&this._(e):void 0!==e._$litType$?this.$(e):void 0!==e.nodeType?this.T(e):(e=>L(e)||"function"==typeof e?.[Symbol.iterator])(e)?this.k(e):this._(e)}O(e){return this._$AA.parentNode.insertBefore(e,this._$AB)}T(e){this._$AH!==e&&(this._$AR(),this._$AH=this.O(e))}_(e){this._$AH!==H&&T(this._$AH)?this._$AA.nextSibling.data=e:this.T(S.createTextNode(e)),this._$AH=e}$(e){const{values:t,_$litType$:o}=e,r="number"==typeof o?this._$AC(e):(void 0===o.el&&(o.el=Q.createElement(Z(o.h,o.h[0]),this.options)),o);if(this._$AH?._$AD===r)this._$AH.p(t);else{const e=new G(r,this),o=e.u(this.options);e.p(t),this.T(o),this._$AH=e}}_$AC(e){let t=V.get(e.strings);return void 0===t&&V.set(e.strings,t=new Q(e)),t}k(e){L(this._$AH)||(this._$AH=[],this._$AR());const t=this._$AH;let o,r=0;for(const i of e)r===t.length?t.push(o=new J(this.O(E()),this.O(E()),this,this.options)):o=t[r],o._$AI(i),r++;r<t.length&&(this._$AR(o&&o._$AB.nextSibling,r),t.length=r)}_$AR(e=this._$AA.nextSibling,t){for(this._$AP?.(!1,!0,t);e!==this._$AB;){const t=C(e).nextSibling;C(e).remove(),e=t}}setConnected(e){void 0===this._$AM&&(this._$Cv=e,this._$AP?.(e))}}class ee{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(e,t,o,r,i){this.type=1,this._$AH=H,this._$AN=void 0,this.element=e,this.name=t,this._$AM=r,this.options=i,o.length>2||""!==o[0]||""!==o[1]?(this._$AH=Array(o.length-1).fill(new String),this.strings=o):this._$AH=H}_$AI(e,t=this,o,r){const i=this.strings;let s=!1;if(void 0===i)e=Y(this,e,t,0),s=!T(e)||e!==this._$AH&&e!==q,s&&(this._$AH=e);else{const r=e;let n,a;for(e=i[0],n=0;n<i.length-1;n++)a=Y(this,r[o+n],t,n),a===q&&(a=this._$AH[n]),s||=!T(a)||a!==this._$AH[n],a===H?e=H:e!==H&&(e+=(a??"")+i[n+1]),this._$AH[n]=a}s&&!r&&this.j(e)}j(e){e===H?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,e??"")}}class te extends ee{constructor(){super(...arguments),this.type=3}j(e){this.element[this.name]=e===H?void 0:e}}class oe extends ee{constructor(){super(...arguments),this.type=4}j(e){this.element.toggleAttribute(this.name,!!e&&e!==H)}}class re extends ee{constructor(e,t,o,r,i){super(e,t,o,r,i),this.type=5}_$AI(e,t=this){if((e=Y(this,e,t,0)??H)===q)return;const o=this._$AH,r=e===H&&o!==H||e.capture!==o.capture||e.once!==o.once||e.passive!==o.passive,i=e!==H&&(o===H||r);r&&this.element.removeEventListener(this.name,this,o),i&&this.element.addEventListener(this.name,this,e),this._$AH=e}handleEvent(e){"function"==typeof this._$AH?this._$AH.call(this.options?.host??this.element,e):this._$AH.handleEvent(e)}}class ie{constructor(e,t,o){this.element=e,this.type=6,this._$AN=void 0,this._$AM=t,this.options=o}get _$AU(){return this._$AM._$AU}_$AI(e){Y(this,e)}}const se=B.litHtmlPolyfillSupport;se?.(Q,J),(B.litHtmlVersions??=[]).push("3.3.3");const ne=globalThis;let ae=class extends y{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){const e=super.createRenderRoot();return this.renderOptions.renderBefore??=e.firstChild,e}update(e){const t=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(e),this._$Do=((e,t,o)=>{const r=o?.renderBefore??t;let i=r._$litPart$;if(void 0===i){const e=o?.renderBefore??null;r._$litPart$=i=new J(t.insertBefore(E(),e),e,void 0,o??{})}return i._$AI(e),i})(t,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return q}};ae._$litElement$=!0,ae.finalized=!0,ne.litElementHydrateSupport?.({LitElement:ae});const ce=ne.litElementPolyfillSupport;ce?.({LitElement:ae}),(ne.litElementVersions??=[]).push("4.2.2");const le={attribute:!0,type:String,converter:k,reflect:!1,hasChanged:w},de=(e=le,t,o)=>{const{kind:r,metadata:i}=o;let s=globalThis.litPropertyMetadata.get(i);if(void 0===s&&globalThis.litPropertyMetadata.set(i,s=new Map),"setter"===r&&((e=Object.create(e)).wrapped=!0),s.set(o.name,e),"accessor"===r){const{name:r}=o;return{set(o){const i=t.get.call(this);t.set.call(this,o),this.requestUpdate(r,i,e,!0,o)},init(t){return void 0!==t&&this.C(r,void 0,e,t),t}}}if("setter"===r){const{name:r}=o;return function(o){const i=this[r];t.call(this,o),this.requestUpdate(r,i,e,!0,o)}}throw Error("Unsupported decorator location: "+r)};function ue(e){return(t,o)=>"object"==typeof o?de(e,t,o):((e,t,o)=>{const r=t.hasOwnProperty(o);return t.constructor.createProperty(o,e),r?Object.getOwnPropertyDescriptor(t,o):void 0})(e,t,o)}function he(e){return ue({...e,state:!0,attribute:!1})}const pe={items_one:"{count} item",items_few:"{count} items",items_many:"{count} items",empty_freezer:"The freezer is empty.",add_first_item:"+ ADD FIRST ITEM",add:"+ ADD",all:"All",uncategorized:"Other",no_weight:"no weight set",pieces_short:"pcs",pieces_field:"Pieces per package",months_old:"{months} mo.",manage:"Manage products",close:"Close",back:"Back",what_to_add:"What do you want to add?",other_product:"Other…",custom_product_name:"Product name",add_product_title:"Add: {name}",edit_item_title:"Edit item",product:"Product",weight:"Weight",original_weight:"Original weight",optional:"optional",month:"Month",year:"Year",note:"Note",quantity:"Number of packages",add_to_freezer:"ADD TO FREEZER",save:"SAVE",cancel:"CANCEL",confirm:"CONFIRM",added_confirmation:"Added to the freezer:",weight_zero_remove:"Weight is 0. Do you want to remove the item?",remove_item_btn:"REMOVE ITEM",err_name_required:"Enter a product name.",err_invalid_weight:"The weight must be a positive number.",err_invalid_month:"The month is not valid.",err_invalid_year:"The year is not valid.",err_invalid_amount:"The amount must be a positive number.",err_amount_too_big:"Cannot remove {amount} g. Only {weight} g left.",err_invalid_pieces:"The number of pieces must be a positive number.",err_pieces_too_big:"Cannot remove {pieces} pcs. Only {count} pcs left.",err_nothing_to_remove:"Enter a weight or a number of pieces.",err_generic:"The action failed.",err_add_failed:"The item could not be added.",err_item_gone:"The item no longer exists. The list was refreshed.",remove_question:"Remove {label}?",note_label:"Note:",remove_all:"REMOVE ALL",remove_half:"REMOVE HALF – {half} g",remove_half_pieces:"REMOVE HALF – {half} pcs",remove_amount:"ENTER AMOUNT",edit:"EDIT",how_much_remove:"How much do you want to remove?",currently_in_freezer:"Currently in the freezer:",remaining_after:"Remaining after removal:",item_removed:"The item was removed.",item_updated:"The item was updated.",undo:"UNDO",categories:"Categories",products:"Products",add_category:"Add category",add_product_btn:"Add product",name:"Name",icon:"Icon",color:"Color",category:"Category",no_category:"No category",default_weight:"Default weight",quick_weights:"Quick weight choices (g, comma separated)",quick_pieces:"Quick piece choices (comma separated)",ask_for_weight:"Show weight field",enabled:"Visible",max_months:"Recommended storage time (months)",delete:"Delete",restore_defaults:"Restore default products",restore_defaults_confirm:"Restore the default products and categories? Items in the freezer stay untouched.",delete_category_confirm:"Delete category {name}? Its products will keep working without a category.",delete_product_confirm:"Delete product {name}?",move_up:"Move up",move_down:"Move down",move:"MOVE",move_where:"Move to which freezer?",item_moved:"The item was moved to: {name}",print_label:"PRINT LABEL",label_downloaded:"Label saved as a PNG image. Open it in your label printer app (e.g. Niimbot) and print.",print_unsupported_app:"Printing does not work in the Home Assistant companion app. Open Home Assistant in a browser (e.g. Chrome) and print from there.",print_all_labels:"Print labels for all items",scan_title:"Scan a label",scan_hint:"Point the camera at the QR code on the package.",scan_unsupported:"QR scanning is not supported in this browser.",scan_https:"The camera requires a secure connection (HTTPS). Open Home Assistant via an HTTPS address (e.g. Nabu Casa).",scan_camera_denied:"Could not start the camera. Check permissions.",scan_not_found:"The scanned item is not in this freezer.",scan_button:"Scan a label",stats_items:"Items",stats_weight:"Total",stats_avg_age:"Average age",stats_oldest:"Oldest",stats_by_category:"By category",stats_monthly:"Monthly overview",stats_added:"Added",stats_removed:"Removed",month_1:"January",month_2:"February",month_3:"March",month_4:"April",month_5:"May",month_6:"June",month_7:"July",month_8:"August",month_9:"September",month_10:"October",month_11:"November",month_12:"December"},me={cs:{items_one:"{count} položka",items_few:"{count} položky",items_many:"{count} položek",empty_freezer:"Mrazák je prázdný.",add_first_item:"+ PŘIDAT PRVNÍ POLOŽKU",add:"+ PŘIDAT",all:"Vše",uncategorized:"Ostatní",no_weight:"hmotnost neuvedena",pieces_short:"ks",pieces_field:"Kusy v balíčku",months_old:"{months} měs.",manage:"Správa produktů",close:"Zavřít",back:"Zpět",what_to_add:"Co chcete přidat?",other_product:"Jiné…",custom_product_name:"Název produktu",add_product_title:"Přidat: {name}",edit_item_title:"Upravit položku",product:"Produkt",weight:"Hmotnost",original_weight:"Původní hmotnost",optional:"nepovinné",month:"Měsíc",year:"Rok",note:"Poznámka",quantity:"Počet balíčků",add_to_freezer:"PŘIDAT DO MRAZÁKU",save:"ULOŽIT",cancel:"ZRUŠIT",confirm:"POTVRDIT",added_confirmation:"Přidáno do mrazáku:",weight_zero_remove:"Hmotnost je 0. Chcete položku odstranit?",remove_item_btn:"ODSTRANIT POLOŽKU",err_name_required:"Zadejte název produktu.",err_invalid_weight:"Hmotnost musí být kladné číslo.",err_invalid_month:"Zadaný měsíc není platný.",err_invalid_year:"Zadaný rok není platný.",err_invalid_amount:"Množství musí být kladné číslo.",err_amount_too_big:"Nelze vyjmout {amount} g. V mrazáku zbývá pouze {weight} g.",err_invalid_pieces:"Počet kusů musí být kladné číslo.",err_pieces_too_big:"Nelze vyjmout {pieces} ks. Zbývá pouze {count} ks.",err_nothing_to_remove:"Zadejte hmotnost nebo počet kusů.",err_generic:"Akce se nepodařila.",err_add_failed:"Položku se nepodařilo přidat.",err_item_gone:"Položka už neexistuje. Seznam byl aktualizován.",remove_question:"Vyjmout {label}?",note_label:"Poznámka:",remove_all:"VYJMOUT CELÉ",remove_half:"VYJMOUT POLOVINU – {half} g",remove_half_pieces:"VYJMOUT POLOVINU – {half} ks",remove_amount:"ZADAT MNOŽSTVÍ",edit:"UPRAVIT",how_much_remove:"Kolik chcete vyjmout?",currently_in_freezer:"Aktuálně v mrazáku:",remaining_after:"Po vyjmutí zůstane:",item_removed:"Položka byla vyjmuta.",item_updated:"Položka byla upravena.",undo:"VRÁTIT ZPĚT",categories:"Kategorie",products:"Produkty",add_category:"Přidat kategorii",add_product_btn:"Přidat produkt",name:"Název",icon:"Ikona",color:"Barva",category:"Kategorie",no_category:"Bez kategorie",default_weight:"Výchozí hmotnost",quick_weights:"Rychlé volby hmotnosti (g, oddělené čárkou)",quick_pieces:"Rychlé volby kusů (oddělené čárkou)",ask_for_weight:"Zobrazovat pole hmotnosti",enabled:"Zobrazovat",max_months:"Doporučená doba skladování (měsíce)",delete:"Smazat",restore_defaults:"Obnovit výchozí produkty",restore_defaults_confirm:"Obnovit výchozí nabídku produktů a kategorií? Položky v mrazáku zůstanou beze změny.",delete_category_confirm:"Smazat kategorii {name}? Produkty v ní zůstanou bez kategorie.",delete_product_confirm:"Smazat produkt {name}?",move_up:"Posunout nahoru",move_down:"Posunout dolů",move:"PŘESUNOUT",move_where:"Kam přesunout?",item_moved:"Položka byla přesunuta do: {name}",print_label:"VYTISKNOUT ŠTÍTEK",label_downloaded:"Štítek uložen jako obrázek (PNG). Otevřete ho v aplikaci své tiskárny (např. Niimbot) a vytiskněte.",print_unsupported_app:"Tisk v aplikaci Home Assistant nefunguje. Otevřete Home Assistant v prohlížeči (např. Chrome) a vytiskněte štítek odtud.",print_all_labels:"Tisk štítků všech položek",scan_title:"Naskenujte štítek",scan_hint:"Namiřte kameru na QR kód na balíčku.",scan_unsupported:"Skenování QR kódů není v tomto prohlížeči podporováno.",scan_https:"Kamera vyžaduje zabezpečené připojení (HTTPS). Otevřete Home Assistant přes HTTPS adresu (např. Nabu Casa).",scan_camera_denied:"Kameru se nepodařilo spustit. Zkontrolujte oprávnění.",scan_not_found:"Naskenovaná položka v tomto mrazáku není.",scan_button:"Naskenovat štítek",stats_items:"Položek",stats_weight:"Celkem",stats_avg_age:"Průměrné stáří",stats_oldest:"Nejstarší",stats_by_category:"Podle kategorií",stats_monthly:"Měsíční přehled",stats_added:"Přidáno",stats_removed:"Vyjmuto",month_1:"Leden",month_2:"Únor",month_3:"Březen",month_4:"Duben",month_5:"Květen",month_6:"Červen",month_7:"Červenec",month_8:"Srpen",month_9:"Září",month_10:"Říjen",month_11:"Listopad",month_12:"Prosinec"},en:pe};function fe(e,t){let o="items_many";return 1===t?o="items_one":t>=2&&t<=4&&(o="items_few"),e(o,{count:t})}function ge(e){return`${String(e.month).padStart(2,"0")}/${e.year}`}function _e(e,t){const o=[e.product_name,ge(e)];return null!=e.weight&&o.push(`${e.weight} ${e.unit||"g"}`),null!=e.pieces&&o.push(`${e.pieces} ${t?t("pieces_short"):"ks"}`),o.join(" · ")}function ve(e,t=new Date){return 12*(t.getFullYear()-e.year)+(t.getMonth()+1-e.month)}function ke(e,t="mdi:food"){const o=e||t;return o.startsWith("mdi:")?W`<ha-icon icon=${o}></ha-icon>`:W`<span class="emoji-icon" aria-hidden="true">${o}</span>`}function we(e){return e?`--fi-avatar-color:${e}`:""}function be(e,t,o){e.dispatchEvent(new CustomEvent(t,{detail:o,bubbles:!0,composed:!0}))}let ye=!1;async function Be(){if(ye)return;if(ye=!0,customElements.get("ha-dialog")&&customElements.get("ha-form")&&customElements.get("ha-icon"))return;const e=window.loadCardHelpers;try{e&&await e();const t=customElements.get("hui-button-card");t?.getConfigElement?.();const o=customElements.get("hui-entities-card");o?.getConfigElement?.(),await Promise.race([customElements.whenDefined("ha-dialog"),new Promise(e=>setTimeout(e,2e3))])}catch{}}const Ce=n`
  :host {
    --fi-accent: var(--primary-color, #03a9f4);
    --fi-text: var(--primary-text-color, #1c1e24);
    --fi-secondary: var(--secondary-text-color, #6f7480);
    --fi-divider: var(--divider-color, rgba(0, 0, 0, 0.08));
    --fi-chip-bg: var(--secondary-background-color, #e8eaee);
    --fi-warn: var(--warning-color, #ff9800);
    --fi-danger: var(--error-color, #f44336);
    --fi-success: var(--success-color, #4caf50);
    --fi-radius: 12px;
    --fi-row-height: 64px;
    --fi-avatar: 44px;
    --fi-avatar-icon: 26px;
    color: var(--fi-text);
  }

  :host([touch]) {
    --fi-row-height: 72px;
    --fi-avatar: 52px;
    --fi-avatar-icon: 30px;
  }

  * {
    box-sizing: border-box;
  }

  button {
    font: inherit;
    color: inherit;
    background: none;
    border: none;
    padding: 0;
    cursor: pointer;
    -webkit-tap-highlight-color: transparent;
    touch-action: manipulation;
  }

  .btn {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    width: 100%;
    min-height: 48px;
    padding: 12px 16px;
    border-radius: var(--fi-radius);
    font-size: 15px;
    font-weight: 600;
    letter-spacing: 0.4px;
    transition: background 0.15s ease;
  }

  .btn-primary {
    background: var(--fi-accent);
    color: var(--text-primary-color, #fff);
  }

  .btn-primary:hover {
    filter: brightness(0.95);
  }

  .btn-outline {
    border: 1px solid var(--fi-divider);
    background: transparent;
    color: var(--fi-text);
  }

  .btn-outline:hover {
    background: color-mix(in srgb, var(--fi-accent) 7%, transparent);
  }

  .btn-danger {
    background: color-mix(in srgb, var(--fi-danger) 14%, transparent);
    color: var(--fi-danger);
  }

  .btn-quiet {
    background: transparent;
    color: var(--fi-secondary);
  }

  .avatar {
    flex: none;
    width: var(--fi-avatar);
    height: var(--fi-avatar);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    background: color-mix(
      in srgb,
      var(--fi-avatar-color, var(--fi-accent)) 14%,
      transparent
    );
    color: var(--fi-avatar-color, var(--fi-accent));
  }

  .avatar ha-icon {
    --mdc-icon-size: var(--fi-avatar-icon);
  }

  .avatar .emoji-icon {
    font-size: calc(var(--fi-avatar-icon) - 2px);
    line-height: 1;
  }

  .avatar.warn {
    background: color-mix(in srgb, var(--fi-warn) 16%, transparent);
    color: var(--fi-warn);
  }

  .avatar.danger {
    background: color-mix(in srgb, var(--fi-danger) 15%, transparent);
    color: var(--fi-danger);
  }

  .field {
    display: flex;
    flex-direction: column;
    gap: 6px;
    margin-bottom: 16px;
  }

  .field label {
    font-size: 13px;
    font-weight: 600;
    color: var(--fi-secondary);
  }

  .field label .opt {
    font-weight: 400;
    opacity: 0.8;
  }

  .field input,
  .field select,
  .field textarea {
    font: inherit;
    color: var(--fi-text);
    background: var(--card-background-color, #fff);
    border: 1px solid var(--fi-divider);
    border-radius: 10px;
    min-height: 48px;
    padding: 10px 14px;
    width: 100%;
  }

  .field input:focus,
  .field select:focus,
  .field textarea:focus {
    outline: 2px solid var(--fi-accent);
    outline-offset: -1px;
  }

  .chips {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
  }

  .chip {
    min-height: 40px;
    padding: 8px 16px;
    border-radius: 20px;
    background: var(--fi-chip-bg);
    color: var(--fi-text);
    font-size: 14px;
    font-weight: 500;
    white-space: nowrap;
  }

  .chip.active {
    background: color-mix(in srgb, var(--fi-accent) 16%, transparent);
    color: var(--fi-accent);
    font-weight: 700;
  }

  .error-banner {
    background: color-mix(in srgb, var(--fi-danger) 12%, transparent);
    color: var(--fi-danger);
    border-radius: 10px;
    padding: 10px 14px;
    margin-bottom: 12px;
    font-size: 14px;
  }

  .view-title {
    font-size: 20px;
    font-weight: 700;
    margin: 0 0 16px;
  }

  .row-of-buttons {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }

  @media (max-width: 450px) {
    :host {
      --fi-row-height: 60px;
    }
  }
`,$e="freezer_inventory";async function xe(e){return e.callWS({type:`${$e}/get_config`})}async function Pe(e){return(await e.callWS({type:`${$e}/get_products`})).products}async function ze(e){return(await e.callWS({type:`${$e}/get_categories`})).categories}async function Me(e){return(await e.callWS({type:`${$e}/get_freezers`})).freezers}async function Ae(e,t){return e.callWS({type:`${$e}/get_stats`,...t?{freezer_id:t}:{}})}async function Se(e,t,o,r){await e.callService($e,"update_item",{freezer_id:t,item_id:o,...r})}function Ee(e,t){if(e&&"object"==typeof e&&"message"in e){const t=e.message;if("string"==typeof t&&t)return t}return t}function Te(e){return e&&e.__esModule&&Object.prototype.hasOwnProperty.call(e,"default")?e.default:e}var Le,Ie={exports:{}};var Ne,Oe=Le?Ie.exports:(Le=1,"undefined"!=typeof self&&self,Ne=function(){return function(e){var t={};function o(r){if(t[r])return t[r].exports;var i=t[r]={i:r,l:!1,exports:{}};return e[r].call(i.exports,i,i.exports,o),i.l=!0,i.exports}return o.m=e,o.c=t,o.d=function(e,t,r){o.o(e,t)||Object.defineProperty(e,t,{configurable:!1,enumerable:!0,get:r})},o.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return o.d(t,"a",t),t},o.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},o.p="",o(o.s=3)}([function(e,t,o){Object.defineProperty(t,"__esModule",{value:!0});var r=function(){function e(e,t){this.width=t,this.height=e.length/t,this.data=e}return e.createEmpty=function(t,o){return new e(new Uint8ClampedArray(t*o),t)},e.prototype.get=function(e,t){return!(e<0||e>=this.width||t<0||t>=this.height||!this.data[t*this.width+e])},e.prototype.set=function(e,t,o){this.data[t*this.width+e]=o?1:0},e.prototype.setRegion=function(e,t,o,r,i){for(var s=t;s<t+r;s++)for(var n=e;n<e+o;n++)this.set(n,s,!!i)},e}();t.BitMatrix=r},function(e,t,o){Object.defineProperty(t,"__esModule",{value:!0});var r=o(2);t.addOrSubtractGF=function(e,t){return e^t};var i=function(){function e(e,t,o){this.primitive=e,this.size=t,this.generatorBase=o,this.expTable=new Array(this.size),this.logTable=new Array(this.size);for(var i=1,s=0;s<this.size;s++)this.expTable[s]=i,(i*=2)>=this.size&&(i=(i^this.primitive)&this.size-1);for(s=0;s<this.size-1;s++)this.logTable[this.expTable[s]]=s;this.zero=new r.default(this,Uint8ClampedArray.from([0])),this.one=new r.default(this,Uint8ClampedArray.from([1]))}return e.prototype.multiply=function(e,t){return 0===e||0===t?0:this.expTable[(this.logTable[e]+this.logTable[t])%(this.size-1)]},e.prototype.inverse=function(e){if(0===e)throw new Error("Can't invert 0");return this.expTable[this.size-this.logTable[e]-1]},e.prototype.buildMonomial=function(e,t){if(e<0)throw new Error("Invalid monomial degree less than 0");if(0===t)return this.zero;var o=new Uint8ClampedArray(e+1);return o[0]=t,new r.default(this,o)},e.prototype.log=function(e){if(0===e)throw new Error("Can't take log(0)");return this.logTable[e]},e.prototype.exp=function(e){return this.expTable[e]},e}();t.default=i},function(e,t,o){Object.defineProperty(t,"__esModule",{value:!0});var r=o(1),i=function(){function e(e,t){if(0===t.length)throw new Error("No coefficients.");this.field=e;var o=t.length;if(o>1&&0===t[0]){for(var r=1;r<o&&0===t[r];)r++;if(r===o)this.coefficients=e.zero.coefficients;else{this.coefficients=new Uint8ClampedArray(o-r);for(var i=0;i<this.coefficients.length;i++)this.coefficients[i]=t[r+i]}}else this.coefficients=t}return e.prototype.degree=function(){return this.coefficients.length-1},e.prototype.isZero=function(){return 0===this.coefficients[0]},e.prototype.getCoefficient=function(e){return this.coefficients[this.coefficients.length-1-e]},e.prototype.addOrSubtract=function(t){var o;if(this.isZero())return t;if(t.isZero())return this;var i=this.coefficients,s=t.coefficients;i.length>s.length&&(i=(o=[s,i])[0],s=o[1]);for(var n=new Uint8ClampedArray(s.length),a=s.length-i.length,c=0;c<a;c++)n[c]=s[c];for(c=a;c<s.length;c++)n[c]=r.addOrSubtractGF(i[c-a],s[c]);return new e(this.field,n)},e.prototype.multiply=function(t){if(0===t)return this.field.zero;if(1===t)return this;for(var o=this.coefficients.length,r=new Uint8ClampedArray(o),i=0;i<o;i++)r[i]=this.field.multiply(this.coefficients[i],t);return new e(this.field,r)},e.prototype.multiplyPoly=function(t){if(this.isZero()||t.isZero())return this.field.zero;for(var o=this.coefficients,i=o.length,s=t.coefficients,n=s.length,a=new Uint8ClampedArray(i+n-1),c=0;c<i;c++)for(var l=o[c],d=0;d<n;d++)a[c+d]=r.addOrSubtractGF(a[c+d],this.field.multiply(l,s[d]));return new e(this.field,a)},e.prototype.multiplyByMonomial=function(t,o){if(t<0)throw new Error("Invalid degree less than 0");if(0===o)return this.field.zero;for(var r=this.coefficients.length,i=new Uint8ClampedArray(r+t),s=0;s<r;s++)i[s]=this.field.multiply(this.coefficients[s],o);return new e(this.field,i)},e.prototype.evaluateAt=function(e){var t=0;if(0===e)return this.getCoefficient(0);var o=this.coefficients.length;if(1===e)return this.coefficients.forEach(function(e){t=r.addOrSubtractGF(t,e)}),t;t=this.coefficients[0];for(var i=1;i<o;i++)t=r.addOrSubtractGF(this.field.multiply(e,t),this.coefficients[i]);return t},e}();t.default=i},function(e,t,o){Object.defineProperty(t,"__esModule",{value:!0});var r=o(4),i=o(5),s=o(11),n=o(12);function a(e){var t=n.locate(e);if(!t)return null;for(var o=0,r=t;o<r.length;o++){var a=r[o],c=s.extract(e,a),l=i.decode(c.matrix);if(l)return{binaryData:l.bytes,data:l.text,chunks:l.chunks,version:l.version,location:{topRightCorner:c.mappingFunction(a.dimension,0),topLeftCorner:c.mappingFunction(0,0),bottomRightCorner:c.mappingFunction(a.dimension,a.dimension),bottomLeftCorner:c.mappingFunction(0,a.dimension),topRightFinderPattern:a.topRight,topLeftFinderPattern:a.topLeft,bottomLeftFinderPattern:a.bottomLeft,bottomRightAlignmentPattern:a.alignmentPattern}}}return null}var c={inversionAttempts:"attemptBoth"};function l(e,t,o,i){void 0===i&&(i={});var s=c;Object.keys(s||{}).forEach(function(e){s[e]=i[e]||s[e]});var n="attemptBoth"===s.inversionAttempts||"invertFirst"===s.inversionAttempts,l="onlyInvert"===s.inversionAttempts||"invertFirst"===s.inversionAttempts,d=r.binarize(e,t,o,n),u=d.binarized,h=d.inverted,p=a(l?h:u);return p||"attemptBoth"!==s.inversionAttempts&&"invertFirst"!==s.inversionAttempts||(p=a(l?u:h)),p}l.default=l,t.default=l},function(e,t,o){Object.defineProperty(t,"__esModule",{value:!0});var r=o(0);function i(e,t,o){return e<t?t:e>o?o:e}var s=function(){function e(e,t){this.width=e,this.data=new Uint8ClampedArray(e*t)}return e.prototype.get=function(e,t){return this.data[t*this.width+e]},e.prototype.set=function(e,t,o){this.data[t*this.width+e]=o},e}();t.binarize=function(e,t,o,n){if(e.length!==t*o*4)throw new Error("Malformed data passed to binarizer.");for(var a=new s(t,o),c=0;c<t;c++)for(var l=0;l<o;l++){var d=e[4*(l*t+c)+0],u=e[4*(l*t+c)+1],h=e[4*(l*t+c)+2];a.set(c,l,.2126*d+.7152*u+.0722*h)}for(var p=Math.ceil(t/8),m=Math.ceil(o/8),f=new s(p,m),g=0;g<m;g++)for(var _=0;_<p;_++){var v=0,k=1/0,w=0;for(l=0;l<8;l++)for(c=0;c<8;c++){var b=a.get(8*_+c,8*g+l);v+=b,k=Math.min(k,b),w=Math.max(w,b)}var y=v/Math.pow(8,2);if(w-k<=24&&(y=k/2,g>0&&_>0)){var B=(f.get(_,g-1)+2*f.get(_-1,g)+f.get(_-1,g-1))/4;k<B&&(y=B)}f.set(_,g,y)}var C=r.BitMatrix.createEmpty(t,o),$=null;for(n&&($=r.BitMatrix.createEmpty(t,o)),g=0;g<m;g++)for(_=0;_<p;_++){for(var x=i(_,2,p-3),P=i(g,2,m-3),z=(v=0,-2);z<=2;z++)for(var M=-2;M<=2;M++)v+=f.get(x+z,P+M);var A=v/25;for(z=0;z<8;z++)for(M=0;M<8;M++){c=8*_+z,l=8*g+M;var S=a.get(c,l);C.set(c,l,S<=A),n&&$.set(c,l,!(S<=A))}}return n?{binarized:C,inverted:$}:{binarized:C}}},function(e,t,o){Object.defineProperty(t,"__esModule",{value:!0});var r=o(0),i=o(6),s=o(9),n=o(10);function a(e,t){for(var o=e^t,r=0;o;)r++,o&=o-1;return r}function c(e,t){return t<<1|e}var l=[{bits:21522,formatInfo:{errorCorrectionLevel:1,dataMask:0}},{bits:20773,formatInfo:{errorCorrectionLevel:1,dataMask:1}},{bits:24188,formatInfo:{errorCorrectionLevel:1,dataMask:2}},{bits:23371,formatInfo:{errorCorrectionLevel:1,dataMask:3}},{bits:17913,formatInfo:{errorCorrectionLevel:1,dataMask:4}},{bits:16590,formatInfo:{errorCorrectionLevel:1,dataMask:5}},{bits:20375,formatInfo:{errorCorrectionLevel:1,dataMask:6}},{bits:19104,formatInfo:{errorCorrectionLevel:1,dataMask:7}},{bits:30660,formatInfo:{errorCorrectionLevel:0,dataMask:0}},{bits:29427,formatInfo:{errorCorrectionLevel:0,dataMask:1}},{bits:32170,formatInfo:{errorCorrectionLevel:0,dataMask:2}},{bits:30877,formatInfo:{errorCorrectionLevel:0,dataMask:3}},{bits:26159,formatInfo:{errorCorrectionLevel:0,dataMask:4}},{bits:25368,formatInfo:{errorCorrectionLevel:0,dataMask:5}},{bits:27713,formatInfo:{errorCorrectionLevel:0,dataMask:6}},{bits:26998,formatInfo:{errorCorrectionLevel:0,dataMask:7}},{bits:5769,formatInfo:{errorCorrectionLevel:3,dataMask:0}},{bits:5054,formatInfo:{errorCorrectionLevel:3,dataMask:1}},{bits:7399,formatInfo:{errorCorrectionLevel:3,dataMask:2}},{bits:6608,formatInfo:{errorCorrectionLevel:3,dataMask:3}},{bits:1890,formatInfo:{errorCorrectionLevel:3,dataMask:4}},{bits:597,formatInfo:{errorCorrectionLevel:3,dataMask:5}},{bits:3340,formatInfo:{errorCorrectionLevel:3,dataMask:6}},{bits:2107,formatInfo:{errorCorrectionLevel:3,dataMask:7}},{bits:13663,formatInfo:{errorCorrectionLevel:2,dataMask:0}},{bits:12392,formatInfo:{errorCorrectionLevel:2,dataMask:1}},{bits:16177,formatInfo:{errorCorrectionLevel:2,dataMask:2}},{bits:14854,formatInfo:{errorCorrectionLevel:2,dataMask:3}},{bits:9396,formatInfo:{errorCorrectionLevel:2,dataMask:4}},{bits:8579,formatInfo:{errorCorrectionLevel:2,dataMask:5}},{bits:11994,formatInfo:{errorCorrectionLevel:2,dataMask:6}},{bits:11245,formatInfo:{errorCorrectionLevel:2,dataMask:7}}],d=[function(e){return(e.y+e.x)%2==0},function(e){return e.y%2==0},function(e){return e.x%3==0},function(e){return(e.y+e.x)%3==0},function(e){return(Math.floor(e.y/2)+Math.floor(e.x/3))%2==0},function(e){return e.x*e.y%2+e.x*e.y%3==0},function(e){return(e.y*e.x%2+e.y*e.x%3)%2==0},function(e){return((e.y+e.x)%2+e.y*e.x%3)%2==0}];function u(e,t,o){for(var i=d[o.dataMask],s=e.height,n=function(e){var t=17+4*e.versionNumber,o=r.BitMatrix.createEmpty(t,t);o.setRegion(0,0,9,9,!0),o.setRegion(t-8,0,8,9,!0),o.setRegion(0,t-8,9,8,!0);for(var i=0,s=e.alignmentPatternCenters;i<s.length;i++)for(var n=s[i],a=0,c=e.alignmentPatternCenters;a<c.length;a++){var l=c[a];6===n&&6===l||6===n&&l===t-7||n===t-7&&6===l||o.setRegion(n-2,l-2,5,5,!0)}return o.setRegion(6,9,1,t-17,!0),o.setRegion(9,6,t-17,1,!0),e.versionNumber>6&&(o.setRegion(t-11,0,3,6,!0),o.setRegion(0,t-11,6,3,!0)),o}(t),a=[],l=0,u=0,h=!0,p=s-1;p>0;p-=2){6===p&&p--;for(var m=0;m<s;m++)for(var f=h?s-1-m:m,g=0;g<2;g++){var _=p-g;if(!n.get(_,f)){u++;var v=e.get(_,f);i({y:f,x:_})&&(v=!v),l=c(v,l),8===u&&(a.push(l),u=0,l=0)}}h=!h}return a}function h(e){var t=function(e){var t=e.height,o=Math.floor((t-17)/4);if(o<=6)return n.VERSIONS[o-1];for(var r=0,i=5;i>=0;i--)for(var s=t-9;s>=t-11;s--)r=c(e.get(s,i),r);var l=0;for(s=5;s>=0;s--)for(i=t-9;i>=t-11;i--)l=c(e.get(s,i),l);for(var d,u=1/0,h=0,p=n.VERSIONS;h<p.length;h++){var m=p[h];if(m.infoBits===r||m.infoBits===l)return m;var f=a(r,m.infoBits);f<u&&(d=m,u=f),(f=a(l,m.infoBits))<u&&(d=m,u=f)}return u<=3?d:void 0}(e);if(!t)return null;var o=function(e){for(var t=0,o=0;o<=8;o++)6!==o&&(t=c(e.get(o,8),t));for(var r=7;r>=0;r--)6!==r&&(t=c(e.get(8,r),t));var i=e.height,s=0;for(r=i-1;r>=i-7;r--)s=c(e.get(8,r),s);for(o=i-8;o<i;o++)s=c(e.get(o,8),s);for(var n=1/0,d=null,u=0,h=l;u<h.length;u++){var p=h[u],m=p.bits,f=p.formatInfo;if(m===t||m===s)return f;var g=a(t,m);g<n&&(d=f,n=g),t!==s&&(g=a(s,m))<n&&(d=f,n=g)}return n<=3?d:null}(e);if(!o)return null;var r=function(e,t,o){var r=t.errorCorrectionLevels[o],i=[],s=0;if(r.ecBlocks.forEach(function(e){for(var t=0;t<e.numBlocks;t++)i.push({numDataCodewords:e.dataCodewordsPerBlock,codewords:[]}),s+=e.dataCodewordsPerBlock+r.ecCodewordsPerBlock}),e.length<s)return null;e=e.slice(0,s);for(var n=r.ecBlocks[0].dataCodewordsPerBlock,a=0;a<n;a++)for(var c=0,l=i;c<l.length;c++)l[c].codewords.push(e.shift());if(r.ecBlocks.length>1){var d=r.ecBlocks[0].numBlocks,u=r.ecBlocks[1].numBlocks;for(a=0;a<u;a++)i[d+a].codewords.push(e.shift())}for(;e.length>0;)for(var h=0,p=i;h<p.length;h++)p[h].codewords.push(e.shift());return i}(u(e,t,o),t,o.errorCorrectionLevel);if(!r)return null;for(var d=r.reduce(function(e,t){return e+t.numDataCodewords},0),h=new Uint8ClampedArray(d),p=0,m=0,f=r;m<f.length;m++){var g=f[m],_=s.decode(g.codewords,g.codewords.length-g.numDataCodewords);if(!_)return null;for(var v=0;v<g.numDataCodewords;v++)h[p++]=_[v]}try{return i.decode(h,t.versionNumber)}catch(e){return null}}t.decode=function(e){if(null==e)return null;var t=h(e);if(t)return t;for(var o=0;o<e.width;o++)for(var r=o+1;r<e.height;r++)e.get(o,r)!==e.get(r,o)&&(e.set(o,r,!e.get(o,r)),e.set(r,o,!e.get(r,o)));return h(e)}},function(e,t,o){Object.defineProperty(t,"__esModule",{value:!0});var r,i,s=o(7),n=o(8);function a(e,t){for(var o=[],r="",i=[10,12,14][t],s=e.readBits(i);s>=3;){if((l=e.readBits(10))>=1e3)throw new Error("Invalid numeric value above 999");var n=Math.floor(l/100),a=Math.floor(l/10)%10,c=l%10;o.push(48+n,48+a,48+c),r+=n.toString()+a.toString()+c.toString(),s-=3}if(2===s){if((l=e.readBits(7))>=100)throw new Error("Invalid numeric value above 99");n=Math.floor(l/10),a=l%10,o.push(48+n,48+a),r+=n.toString()+a.toString()}else if(1===s){var l;if((l=e.readBits(4))>=10)throw new Error("Invalid numeric value above 9");o.push(48+l),r+=l.toString()}return{bytes:o,text:r}}!function(e){e.Numeric="numeric",e.Alphanumeric="alphanumeric",e.Byte="byte",e.Kanji="kanji",e.ECI="eci"}(r=t.Mode||(t.Mode={})),function(e){e[e.Terminator=0]="Terminator",e[e.Numeric=1]="Numeric",e[e.Alphanumeric=2]="Alphanumeric",e[e.Byte=4]="Byte",e[e.Kanji=8]="Kanji",e[e.ECI=7]="ECI"}(i||(i={}));var c=["0","1","2","3","4","5","6","7","8","9","A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"," ","$","%","*","+","-",".","/",":"];function l(e,t){for(var o=[],r="",i=[9,11,13][t],s=e.readBits(i);s>=2;){var n=e.readBits(11),a=Math.floor(n/45),l=n%45;o.push(c[a].charCodeAt(0),c[l].charCodeAt(0)),r+=c[a]+c[l],s-=2}return 1===s&&(a=e.readBits(6),o.push(c[a].charCodeAt(0)),r+=c[a]),{bytes:o,text:r}}function d(e,t){for(var o=[],r="",i=[8,16,16][t],s=e.readBits(i),n=0;n<s;n++){var a=e.readBits(8);o.push(a)}try{r+=decodeURIComponent(o.map(function(e){return"%"+("0"+e.toString(16)).substr(-2)}).join(""))}catch(e){}return{bytes:o,text:r}}function u(e,t){for(var o=[],r="",i=[8,10,12][t],s=e.readBits(i),a=0;a<s;a++){var c=e.readBits(13),l=Math.floor(c/192)<<8|c%192;l+=l<7936?33088:49472,o.push(l>>8,255&l),r+=String.fromCharCode(n.shiftJISTable[l])}return{bytes:o,text:r}}t.decode=function(e,t){for(var o,n,c,h,p=new s.BitStream(e),m=t<=9?0:t<=26?1:2,f={text:"",bytes:[],chunks:[],version:t};p.available()>=4;){var g=p.readBits(4);if(g===i.Terminator)return f;if(g===i.ECI)0===p.readBits(1)?f.chunks.push({type:r.ECI,assignmentNumber:p.readBits(7)}):0===p.readBits(1)?f.chunks.push({type:r.ECI,assignmentNumber:p.readBits(14)}):0===p.readBits(1)?f.chunks.push({type:r.ECI,assignmentNumber:p.readBits(21)}):f.chunks.push({type:r.ECI,assignmentNumber:-1});else if(g===i.Numeric){var _=a(p,m);f.text+=_.text,(o=f.bytes).push.apply(o,_.bytes),f.chunks.push({type:r.Numeric,text:_.text})}else if(g===i.Alphanumeric){var v=l(p,m);f.text+=v.text,(n=f.bytes).push.apply(n,v.bytes),f.chunks.push({type:r.Alphanumeric,text:v.text})}else if(g===i.Byte){var k=d(p,m);f.text+=k.text,(c=f.bytes).push.apply(c,k.bytes),f.chunks.push({type:r.Byte,bytes:k.bytes,text:k.text})}else if(g===i.Kanji){var w=u(p,m);f.text+=w.text,(h=f.bytes).push.apply(h,w.bytes),f.chunks.push({type:r.Kanji,bytes:w.bytes,text:w.text})}}if(0===p.available()||0===p.readBits(p.available()))return f}},function(e,t,o){Object.defineProperty(t,"__esModule",{value:!0});var r=function(){function e(e){this.byteOffset=0,this.bitOffset=0,this.bytes=e}return e.prototype.readBits=function(e){if(e<1||e>32||e>this.available())throw new Error("Cannot read "+e.toString()+" bits");var t=0;if(this.bitOffset>0){var o=8-this.bitOffset,r=e<o?e:o,i=255>>8-r<<(s=o-r);t=(this.bytes[this.byteOffset]&i)>>s,e-=r,this.bitOffset+=r,8===this.bitOffset&&(this.bitOffset=0,this.byteOffset++)}if(e>0){for(;e>=8;)t=t<<8|255&this.bytes[this.byteOffset],this.byteOffset++,e-=8;var s;e>0&&(i=255>>(s=8-e)<<s,t=t<<e|(this.bytes[this.byteOffset]&i)>>s,this.bitOffset+=e)}return t},e.prototype.available=function(){return 8*(this.bytes.length-this.byteOffset)-this.bitOffset},e}();t.BitStream=r},function(e,t,o){Object.defineProperty(t,"__esModule",{value:!0}),t.shiftJISTable={32:32,33:33,34:34,35:35,36:36,37:37,38:38,39:39,40:40,41:41,42:42,43:43,44:44,45:45,46:46,47:47,48:48,49:49,50:50,51:51,52:52,53:53,54:54,55:55,56:56,57:57,58:58,59:59,60:60,61:61,62:62,63:63,64:64,65:65,66:66,67:67,68:68,69:69,70:70,71:71,72:72,73:73,74:74,75:75,76:76,77:77,78:78,79:79,80:80,81:81,82:82,83:83,84:84,85:85,86:86,87:87,88:88,89:89,90:90,91:91,92:165,93:93,94:94,95:95,96:96,97:97,98:98,99:99,100:100,101:101,102:102,103:103,104:104,105:105,106:106,107:107,108:108,109:109,110:110,111:111,112:112,113:113,114:114,115:115,116:116,117:117,118:118,119:119,120:120,121:121,122:122,123:123,124:124,125:125,126:8254,33088:12288,33089:12289,33090:12290,33091:65292,33092:65294,33093:12539,33094:65306,33095:65307,33096:65311,33097:65281,33098:12443,33099:12444,33100:180,33101:65344,33102:168,33103:65342,33104:65507,33105:65343,33106:12541,33107:12542,33108:12445,33109:12446,33110:12291,33111:20189,33112:12293,33113:12294,33114:12295,33115:12540,33116:8213,33117:8208,33118:65295,33119:92,33120:12316,33121:8214,33122:65372,33123:8230,33124:8229,33125:8216,33126:8217,33127:8220,33128:8221,33129:65288,33130:65289,33131:12308,33132:12309,33133:65339,33134:65341,33135:65371,33136:65373,33137:12296,33138:12297,33139:12298,33140:12299,33141:12300,33142:12301,33143:12302,33144:12303,33145:12304,33146:12305,33147:65291,33148:8722,33149:177,33150:215,33152:247,33153:65309,33154:8800,33155:65308,33156:65310,33157:8806,33158:8807,33159:8734,33160:8756,33161:9794,33162:9792,33163:176,33164:8242,33165:8243,33166:8451,33167:65509,33168:65284,33169:162,33170:163,33171:65285,33172:65283,33173:65286,33174:65290,33175:65312,33176:167,33177:9734,33178:9733,33179:9675,33180:9679,33181:9678,33182:9671,33183:9670,33184:9633,33185:9632,33186:9651,33187:9650,33188:9661,33189:9660,33190:8251,33191:12306,33192:8594,33193:8592,33194:8593,33195:8595,33196:12307,33208:8712,33209:8715,33210:8838,33211:8839,33212:8834,33213:8835,33214:8746,33215:8745,33224:8743,33225:8744,33226:172,33227:8658,33228:8660,33229:8704,33230:8707,33242:8736,33243:8869,33244:8978,33245:8706,33246:8711,33247:8801,33248:8786,33249:8810,33250:8811,33251:8730,33252:8765,33253:8733,33254:8757,33255:8747,33256:8748,33264:8491,33265:8240,33266:9839,33267:9837,33268:9834,33269:8224,33270:8225,33271:182,33276:9711,33359:65296,33360:65297,33361:65298,33362:65299,33363:65300,33364:65301,33365:65302,33366:65303,33367:65304,33368:65305,33376:65313,33377:65314,33378:65315,33379:65316,33380:65317,33381:65318,33382:65319,33383:65320,33384:65321,33385:65322,33386:65323,33387:65324,33388:65325,33389:65326,33390:65327,33391:65328,33392:65329,33393:65330,33394:65331,33395:65332,33396:65333,33397:65334,33398:65335,33399:65336,33400:65337,33401:65338,33409:65345,33410:65346,33411:65347,33412:65348,33413:65349,33414:65350,33415:65351,33416:65352,33417:65353,33418:65354,33419:65355,33420:65356,33421:65357,33422:65358,33423:65359,33424:65360,33425:65361,33426:65362,33427:65363,33428:65364,33429:65365,33430:65366,33431:65367,33432:65368,33433:65369,33434:65370,33439:12353,33440:12354,33441:12355,33442:12356,33443:12357,33444:12358,33445:12359,33446:12360,33447:12361,33448:12362,33449:12363,33450:12364,33451:12365,33452:12366,33453:12367,33454:12368,33455:12369,33456:12370,33457:12371,33458:12372,33459:12373,33460:12374,33461:12375,33462:12376,33463:12377,33464:12378,33465:12379,33466:12380,33467:12381,33468:12382,33469:12383,33470:12384,33471:12385,33472:12386,33473:12387,33474:12388,33475:12389,33476:12390,33477:12391,33478:12392,33479:12393,33480:12394,33481:12395,33482:12396,33483:12397,33484:12398,33485:12399,33486:12400,33487:12401,33488:12402,33489:12403,33490:12404,33491:12405,33492:12406,33493:12407,33494:12408,33495:12409,33496:12410,33497:12411,33498:12412,33499:12413,33500:12414,33501:12415,33502:12416,33503:12417,33504:12418,33505:12419,33506:12420,33507:12421,33508:12422,33509:12423,33510:12424,33511:12425,33512:12426,33513:12427,33514:12428,33515:12429,33516:12430,33517:12431,33518:12432,33519:12433,33520:12434,33521:12435,33600:12449,33601:12450,33602:12451,33603:12452,33604:12453,33605:12454,33606:12455,33607:12456,33608:12457,33609:12458,33610:12459,33611:12460,33612:12461,33613:12462,33614:12463,33615:12464,33616:12465,33617:12466,33618:12467,33619:12468,33620:12469,33621:12470,33622:12471,33623:12472,33624:12473,33625:12474,33626:12475,33627:12476,33628:12477,33629:12478,33630:12479,33631:12480,33632:12481,33633:12482,33634:12483,33635:12484,33636:12485,33637:12486,33638:12487,33639:12488,33640:12489,33641:12490,33642:12491,33643:12492,33644:12493,33645:12494,33646:12495,33647:12496,33648:12497,33649:12498,33650:12499,33651:12500,33652:12501,33653:12502,33654:12503,33655:12504,33656:12505,33657:12506,33658:12507,33659:12508,33660:12509,33661:12510,33662:12511,33664:12512,33665:12513,33666:12514,33667:12515,33668:12516,33669:12517,33670:12518,33671:12519,33672:12520,33673:12521,33674:12522,33675:12523,33676:12524,33677:12525,33678:12526,33679:12527,33680:12528,33681:12529,33682:12530,33683:12531,33684:12532,33685:12533,33686:12534,33695:913,33696:914,33697:915,33698:916,33699:917,33700:918,33701:919,33702:920,33703:921,33704:922,33705:923,33706:924,33707:925,33708:926,33709:927,33710:928,33711:929,33712:931,33713:932,33714:933,33715:934,33716:935,33717:936,33718:937,33727:945,33728:946,33729:947,33730:948,33731:949,33732:950,33733:951,33734:952,33735:953,33736:954,33737:955,33738:956,33739:957,33740:958,33741:959,33742:960,33743:961,33744:963,33745:964,33746:965,33747:966,33748:967,33749:968,33750:969,33856:1040,33857:1041,33858:1042,33859:1043,33860:1044,33861:1045,33862:1025,33863:1046,33864:1047,33865:1048,33866:1049,33867:1050,33868:1051,33869:1052,33870:1053,33871:1054,33872:1055,33873:1056,33874:1057,33875:1058,33876:1059,33877:1060,33878:1061,33879:1062,33880:1063,33881:1064,33882:1065,33883:1066,33884:1067,33885:1068,33886:1069,33887:1070,33888:1071,33904:1072,33905:1073,33906:1074,33907:1075,33908:1076,33909:1077,33910:1105,33911:1078,33912:1079,33913:1080,33914:1081,33915:1082,33916:1083,33917:1084,33918:1085,33920:1086,33921:1087,33922:1088,33923:1089,33924:1090,33925:1091,33926:1092,33927:1093,33928:1094,33929:1095,33930:1096,33931:1097,33932:1098,33933:1099,33934:1100,33935:1101,33936:1102,33937:1103,33951:9472,33952:9474,33953:9484,33954:9488,33955:9496,33956:9492,33957:9500,33958:9516,33959:9508,33960:9524,33961:9532,33962:9473,33963:9475,33964:9487,33965:9491,33966:9499,33967:9495,33968:9507,33969:9523,33970:9515,33971:9531,33972:9547,33973:9504,33974:9519,33975:9512,33976:9527,33977:9535,33978:9501,33979:9520,33980:9509,33981:9528,33982:9538,34975:20124,34976:21782,34977:23043,34978:38463,34979:21696,34980:24859,34981:25384,34982:23030,34983:36898,34984:33909,34985:33564,34986:31312,34987:24746,34988:25569,34989:28197,34990:26093,34991:33894,34992:33446,34993:39925,34994:26771,34995:22311,34996:26017,34997:25201,34998:23451,34999:22992,35e3:34427,35001:39156,35002:32098,35003:32190,35004:39822,35005:25110,35006:31903,35007:34999,35008:23433,35009:24245,35010:25353,35011:26263,35012:26696,35013:38343,35014:38797,35015:26447,35016:20197,35017:20234,35018:20301,35019:20381,35020:20553,35021:22258,35022:22839,35023:22996,35024:23041,35025:23561,35026:24799,35027:24847,35028:24944,35029:26131,35030:26885,35031:28858,35032:30031,35033:30064,35034:31227,35035:32173,35036:32239,35037:32963,35038:33806,35039:34915,35040:35586,35041:36949,35042:36986,35043:21307,35044:20117,35045:20133,35046:22495,35047:32946,35048:37057,35049:30959,35050:19968,35051:22769,35052:28322,35053:36920,35054:31282,35055:33576,35056:33419,35057:39983,35058:20801,35059:21360,35060:21693,35061:21729,35062:22240,35063:23035,35064:24341,35065:39154,35066:28139,35067:32996,35068:34093,35136:38498,35137:38512,35138:38560,35139:38907,35140:21515,35141:21491,35142:23431,35143:28879,35144:32701,35145:36802,35146:38632,35147:21359,35148:40284,35149:31418,35150:19985,35151:30867,35152:33276,35153:28198,35154:22040,35155:21764,35156:27421,35157:34074,35158:39995,35159:23013,35160:21417,35161:28006,35162:29916,35163:38287,35164:22082,35165:20113,35166:36939,35167:38642,35168:33615,35169:39180,35170:21473,35171:21942,35172:23344,35173:24433,35174:26144,35175:26355,35176:26628,35177:27704,35178:27891,35179:27945,35180:29787,35181:30408,35182:31310,35183:38964,35184:33521,35185:34907,35186:35424,35187:37613,35188:28082,35189:30123,35190:30410,35191:39365,35192:24742,35193:35585,35194:36234,35195:38322,35196:27022,35197:21421,35198:20870,35200:22290,35201:22576,35202:22852,35203:23476,35204:24310,35205:24616,35206:25513,35207:25588,35208:27839,35209:28436,35210:28814,35211:28948,35212:29017,35213:29141,35214:29503,35215:32257,35216:33398,35217:33489,35218:34199,35219:36960,35220:37467,35221:40219,35222:22633,35223:26044,35224:27738,35225:29989,35226:20985,35227:22830,35228:22885,35229:24448,35230:24540,35231:25276,35232:26106,35233:27178,35234:27431,35235:27572,35236:29579,35237:32705,35238:35158,35239:40236,35240:40206,35241:40644,35242:23713,35243:27798,35244:33659,35245:20740,35246:23627,35247:25014,35248:33222,35249:26742,35250:29281,35251:20057,35252:20474,35253:21368,35254:24681,35255:28201,35256:31311,35257:38899,35258:19979,35259:21270,35260:20206,35261:20309,35262:20285,35263:20385,35264:20339,35265:21152,35266:21487,35267:22025,35268:22799,35269:23233,35270:23478,35271:23521,35272:31185,35273:26247,35274:26524,35275:26550,35276:27468,35277:27827,35278:28779,35279:29634,35280:31117,35281:31166,35282:31292,35283:31623,35284:33457,35285:33499,35286:33540,35287:33655,35288:33775,35289:33747,35290:34662,35291:35506,35292:22057,35293:36008,35294:36838,35295:36942,35296:38686,35297:34442,35298:20420,35299:23784,35300:25105,35301:29273,35302:30011,35303:33253,35304:33469,35305:34558,35306:36032,35307:38597,35308:39187,35309:39381,35310:20171,35311:20250,35312:35299,35313:22238,35314:22602,35315:22730,35316:24315,35317:24555,35318:24618,35319:24724,35320:24674,35321:25040,35322:25106,35323:25296,35324:25913,35392:39745,35393:26214,35394:26800,35395:28023,35396:28784,35397:30028,35398:30342,35399:32117,35400:33445,35401:34809,35402:38283,35403:38542,35404:35997,35405:20977,35406:21182,35407:22806,35408:21683,35409:23475,35410:23830,35411:24936,35412:27010,35413:28079,35414:30861,35415:33995,35416:34903,35417:35442,35418:37799,35419:39608,35420:28012,35421:39336,35422:34521,35423:22435,35424:26623,35425:34510,35426:37390,35427:21123,35428:22151,35429:21508,35430:24275,35431:25313,35432:25785,35433:26684,35434:26680,35435:27579,35436:29554,35437:30906,35438:31339,35439:35226,35440:35282,35441:36203,35442:36611,35443:37101,35444:38307,35445:38548,35446:38761,35447:23398,35448:23731,35449:27005,35450:38989,35451:38990,35452:25499,35453:31520,35454:27179,35456:27263,35457:26806,35458:39949,35459:28511,35460:21106,35461:21917,35462:24688,35463:25324,35464:27963,35465:28167,35466:28369,35467:33883,35468:35088,35469:36676,35470:19988,35471:39993,35472:21494,35473:26907,35474:27194,35475:38788,35476:26666,35477:20828,35478:31427,35479:33970,35480:37340,35481:37772,35482:22107,35483:40232,35484:26658,35485:33541,35486:33841,35487:31909,35488:21e3,35489:33477,35490:29926,35491:20094,35492:20355,35493:20896,35494:23506,35495:21002,35496:21208,35497:21223,35498:24059,35499:21914,35500:22570,35501:23014,35502:23436,35503:23448,35504:23515,35505:24178,35506:24185,35507:24739,35508:24863,35509:24931,35510:25022,35511:25563,35512:25954,35513:26577,35514:26707,35515:26874,35516:27454,35517:27475,35518:27735,35519:28450,35520:28567,35521:28485,35522:29872,35523:29976,35524:30435,35525:30475,35526:31487,35527:31649,35528:31777,35529:32233,35530:32566,35531:32752,35532:32925,35533:33382,35534:33694,35535:35251,35536:35532,35537:36011,35538:36996,35539:37969,35540:38291,35541:38289,35542:38306,35543:38501,35544:38867,35545:39208,35546:33304,35547:20024,35548:21547,35549:23736,35550:24012,35551:29609,35552:30284,35553:30524,35554:23721,35555:32747,35556:36107,35557:38593,35558:38929,35559:38996,35560:39e3,35561:20225,35562:20238,35563:21361,35564:21916,35565:22120,35566:22522,35567:22855,35568:23305,35569:23492,35570:23696,35571:24076,35572:24190,35573:24524,35574:25582,35575:26426,35576:26071,35577:26082,35578:26399,35579:26827,35580:26820,35648:27231,35649:24112,35650:27589,35651:27671,35652:27773,35653:30079,35654:31048,35655:23395,35656:31232,35657:32e3,35658:24509,35659:35215,35660:35352,35661:36020,35662:36215,35663:36556,35664:36637,35665:39138,35666:39438,35667:39740,35668:20096,35669:20605,35670:20736,35671:22931,35672:23452,35673:25135,35674:25216,35675:25836,35676:27450,35677:29344,35678:30097,35679:31047,35680:32681,35681:34811,35682:35516,35683:35696,35684:25516,35685:33738,35686:38816,35687:21513,35688:21507,35689:21931,35690:26708,35691:27224,35692:35440,35693:30759,35694:26485,35695:40653,35696:21364,35697:23458,35698:33050,35699:34384,35700:36870,35701:19992,35702:20037,35703:20167,35704:20241,35705:21450,35706:21560,35707:23470,35708:24339,35709:24613,35710:25937,35712:26429,35713:27714,35714:27762,35715:27875,35716:28792,35717:29699,35718:31350,35719:31406,35720:31496,35721:32026,35722:31998,35723:32102,35724:26087,35725:29275,35726:21435,35727:23621,35728:24040,35729:25298,35730:25312,35731:25369,35732:28192,35733:34394,35734:35377,35735:36317,35736:37624,35737:28417,35738:31142,35739:39770,35740:20136,35741:20139,35742:20140,35743:20379,35744:20384,35745:20689,35746:20807,35747:31478,35748:20849,35749:20982,35750:21332,35751:21281,35752:21375,35753:21483,35754:21932,35755:22659,35756:23777,35757:24375,35758:24394,35759:24623,35760:24656,35761:24685,35762:25375,35763:25945,35764:27211,35765:27841,35766:29378,35767:29421,35768:30703,35769:33016,35770:33029,35771:33288,35772:34126,35773:37111,35774:37857,35775:38911,35776:39255,35777:39514,35778:20208,35779:20957,35780:23597,35781:26241,35782:26989,35783:23616,35784:26354,35785:26997,35786:29577,35787:26704,35788:31873,35789:20677,35790:21220,35791:22343,35792:24062,35793:37670,35794:26020,35795:27427,35796:27453,35797:29748,35798:31105,35799:31165,35800:31563,35801:32202,35802:33465,35803:33740,35804:34943,35805:35167,35806:35641,35807:36817,35808:37329,35809:21535,35810:37504,35811:20061,35812:20534,35813:21477,35814:21306,35815:29399,35816:29590,35817:30697,35818:33510,35819:36527,35820:39366,35821:39368,35822:39378,35823:20855,35824:24858,35825:34398,35826:21936,35827:31354,35828:20598,35829:23507,35830:36935,35831:38533,35832:20018,35833:27355,35834:37351,35835:23633,35836:23624,35904:25496,35905:31391,35906:27795,35907:38772,35908:36705,35909:31402,35910:29066,35911:38536,35912:31874,35913:26647,35914:32368,35915:26705,35916:37740,35917:21234,35918:21531,35919:34219,35920:35347,35921:32676,35922:36557,35923:37089,35924:21350,35925:34952,35926:31041,35927:20418,35928:20670,35929:21009,35930:20804,35931:21843,35932:22317,35933:29674,35934:22411,35935:22865,35936:24418,35937:24452,35938:24693,35939:24950,35940:24935,35941:25001,35942:25522,35943:25658,35944:25964,35945:26223,35946:26690,35947:28179,35948:30054,35949:31293,35950:31995,35951:32076,35952:32153,35953:32331,35954:32619,35955:33550,35956:33610,35957:34509,35958:35336,35959:35427,35960:35686,35961:36605,35962:38938,35963:40335,35964:33464,35965:36814,35966:39912,35968:21127,35969:25119,35970:25731,35971:28608,35972:38553,35973:26689,35974:20625,35975:27424,35976:27770,35977:28500,35978:31348,35979:32080,35980:34880,35981:35363,35982:26376,35983:20214,35984:20537,35985:20518,35986:20581,35987:20860,35988:21048,35989:21091,35990:21927,35991:22287,35992:22533,35993:23244,35994:24314,35995:25010,35996:25080,35997:25331,35998:25458,35999:26908,36e3:27177,36001:29309,36002:29356,36003:29486,36004:30740,36005:30831,36006:32121,36007:30476,36008:32937,36009:35211,36010:35609,36011:36066,36012:36562,36013:36963,36014:37749,36015:38522,36016:38997,36017:39443,36018:40568,36019:20803,36020:21407,36021:21427,36022:24187,36023:24358,36024:28187,36025:28304,36026:29572,36027:29694,36028:32067,36029:33335,36030:35328,36031:35578,36032:38480,36033:20046,36034:20491,36035:21476,36036:21628,36037:22266,36038:22993,36039:23396,36040:24049,36041:24235,36042:24359,36043:25144,36044:25925,36045:26543,36046:28246,36047:29392,36048:31946,36049:34996,36050:32929,36051:32993,36052:33776,36053:34382,36054:35463,36055:36328,36056:37431,36057:38599,36058:39015,36059:40723,36060:20116,36061:20114,36062:20237,36063:21320,36064:21577,36065:21566,36066:23087,36067:24460,36068:24481,36069:24735,36070:26791,36071:27278,36072:29786,36073:30849,36074:35486,36075:35492,36076:35703,36077:37264,36078:20062,36079:39881,36080:20132,36081:20348,36082:20399,36083:20505,36084:20502,36085:20809,36086:20844,36087:21151,36088:21177,36089:21246,36090:21402,36091:21475,36092:21521,36160:21518,36161:21897,36162:22353,36163:22434,36164:22909,36165:23380,36166:23389,36167:23439,36168:24037,36169:24039,36170:24055,36171:24184,36172:24195,36173:24218,36174:24247,36175:24344,36176:24658,36177:24908,36178:25239,36179:25304,36180:25511,36181:25915,36182:26114,36183:26179,36184:26356,36185:26477,36186:26657,36187:26775,36188:27083,36189:27743,36190:27946,36191:28009,36192:28207,36193:28317,36194:30002,36195:30343,36196:30828,36197:31295,36198:31968,36199:32005,36200:32024,36201:32094,36202:32177,36203:32789,36204:32771,36205:32943,36206:32945,36207:33108,36208:33167,36209:33322,36210:33618,36211:34892,36212:34913,36213:35611,36214:36002,36215:36092,36216:37066,36217:37237,36218:37489,36219:30783,36220:37628,36221:38308,36222:38477,36224:38917,36225:39321,36226:39640,36227:40251,36228:21083,36229:21163,36230:21495,36231:21512,36232:22741,36233:25335,36234:28640,36235:35946,36236:36703,36237:40633,36238:20811,36239:21051,36240:21578,36241:22269,36242:31296,36243:37239,36244:40288,36245:40658,36246:29508,36247:28425,36248:33136,36249:29969,36250:24573,36251:24794,36252:39592,36253:29403,36254:36796,36255:27492,36256:38915,36257:20170,36258:22256,36259:22372,36260:22718,36261:23130,36262:24680,36263:25031,36264:26127,36265:26118,36266:26681,36267:26801,36268:28151,36269:30165,36270:32058,36271:33390,36272:39746,36273:20123,36274:20304,36275:21449,36276:21766,36277:23919,36278:24038,36279:24046,36280:26619,36281:27801,36282:29811,36283:30722,36284:35408,36285:37782,36286:35039,36287:22352,36288:24231,36289:25387,36290:20661,36291:20652,36292:20877,36293:26368,36294:21705,36295:22622,36296:22971,36297:23472,36298:24425,36299:25165,36300:25505,36301:26685,36302:27507,36303:28168,36304:28797,36305:37319,36306:29312,36307:30741,36308:30758,36309:31085,36310:25998,36311:32048,36312:33756,36313:35009,36314:36617,36315:38555,36316:21092,36317:22312,36318:26448,36319:32618,36320:36001,36321:20916,36322:22338,36323:38442,36324:22586,36325:27018,36326:32948,36327:21682,36328:23822,36329:22524,36330:30869,36331:40442,36332:20316,36333:21066,36334:21643,36335:25662,36336:26152,36337:26388,36338:26613,36339:31364,36340:31574,36341:32034,36342:37679,36343:26716,36344:39853,36345:31545,36346:21273,36347:20874,36348:21047,36416:23519,36417:25334,36418:25774,36419:25830,36420:26413,36421:27578,36422:34217,36423:38609,36424:30352,36425:39894,36426:25420,36427:37638,36428:39851,36429:30399,36430:26194,36431:19977,36432:20632,36433:21442,36434:23665,36435:24808,36436:25746,36437:25955,36438:26719,36439:29158,36440:29642,36441:29987,36442:31639,36443:32386,36444:34453,36445:35715,36446:36059,36447:37240,36448:39184,36449:26028,36450:26283,36451:27531,36452:20181,36453:20180,36454:20282,36455:20351,36456:21050,36457:21496,36458:21490,36459:21987,36460:22235,36461:22763,36462:22987,36463:22985,36464:23039,36465:23376,36466:23629,36467:24066,36468:24107,36469:24535,36470:24605,36471:25351,36472:25903,36473:23388,36474:26031,36475:26045,36476:26088,36477:26525,36478:27490,36480:27515,36481:27663,36482:29509,36483:31049,36484:31169,36485:31992,36486:32025,36487:32043,36488:32930,36489:33026,36490:33267,36491:35222,36492:35422,36493:35433,36494:35430,36495:35468,36496:35566,36497:36039,36498:36060,36499:38604,36500:39164,36501:27503,36502:20107,36503:20284,36504:20365,36505:20816,36506:23383,36507:23546,36508:24904,36509:25345,36510:26178,36511:27425,36512:28363,36513:27835,36514:29246,36515:29885,36516:30164,36517:30913,36518:31034,36519:32780,36520:32819,36521:33258,36522:33940,36523:36766,36524:27728,36525:40575,36526:24335,36527:35672,36528:40235,36529:31482,36530:36600,36531:23437,36532:38635,36533:19971,36534:21489,36535:22519,36536:22833,36537:23241,36538:23460,36539:24713,36540:28287,36541:28422,36542:30142,36543:36074,36544:23455,36545:34048,36546:31712,36547:20594,36548:26612,36549:33437,36550:23649,36551:34122,36552:32286,36553:33294,36554:20889,36555:23556,36556:25448,36557:36198,36558:26012,36559:29038,36560:31038,36561:32023,36562:32773,36563:35613,36564:36554,36565:36974,36566:34503,36567:37034,36568:20511,36569:21242,36570:23610,36571:26451,36572:28796,36573:29237,36574:37196,36575:37320,36576:37675,36577:33509,36578:23490,36579:24369,36580:24825,36581:20027,36582:21462,36583:23432,36584:25163,36585:26417,36586:27530,36587:29417,36588:29664,36589:31278,36590:33131,36591:36259,36592:37202,36593:39318,36594:20754,36595:21463,36596:21610,36597:23551,36598:25480,36599:27193,36600:32172,36601:38656,36602:22234,36603:21454,36604:21608,36672:23447,36673:23601,36674:24030,36675:20462,36676:24833,36677:25342,36678:27954,36679:31168,36680:31179,36681:32066,36682:32333,36683:32722,36684:33261,36685:33311,36686:33936,36687:34886,36688:35186,36689:35728,36690:36468,36691:36655,36692:36913,36693:37195,36694:37228,36695:38598,36696:37276,36697:20160,36698:20303,36699:20805,36700:21313,36701:24467,36702:25102,36703:26580,36704:27713,36705:28171,36706:29539,36707:32294,36708:37325,36709:37507,36710:21460,36711:22809,36712:23487,36713:28113,36714:31069,36715:32302,36716:31899,36717:22654,36718:29087,36719:20986,36720:34899,36721:36848,36722:20426,36723:23803,36724:26149,36725:30636,36726:31459,36727:33308,36728:39423,36729:20934,36730:24490,36731:26092,36732:26991,36733:27529,36734:28147,36736:28310,36737:28516,36738:30462,36739:32020,36740:24033,36741:36981,36742:37255,36743:38918,36744:20966,36745:21021,36746:25152,36747:26257,36748:26329,36749:28186,36750:24246,36751:32210,36752:32626,36753:26360,36754:34223,36755:34295,36756:35576,36757:21161,36758:21465,36759:22899,36760:24207,36761:24464,36762:24661,36763:37604,36764:38500,36765:20663,36766:20767,36767:21213,36768:21280,36769:21319,36770:21484,36771:21736,36772:21830,36773:21809,36774:22039,36775:22888,36776:22974,36777:23100,36778:23477,36779:23558,36780:23567,36781:23569,36782:23578,36783:24196,36784:24202,36785:24288,36786:24432,36787:25215,36788:25220,36789:25307,36790:25484,36791:25463,36792:26119,36793:26124,36794:26157,36795:26230,36796:26494,36797:26786,36798:27167,36799:27189,36800:27836,36801:28040,36802:28169,36803:28248,36804:28988,36805:28966,36806:29031,36807:30151,36808:30465,36809:30813,36810:30977,36811:31077,36812:31216,36813:31456,36814:31505,36815:31911,36816:32057,36817:32918,36818:33750,36819:33931,36820:34121,36821:34909,36822:35059,36823:35359,36824:35388,36825:35412,36826:35443,36827:35937,36828:36062,36829:37284,36830:37478,36831:37758,36832:37912,36833:38556,36834:38808,36835:19978,36836:19976,36837:19998,36838:20055,36839:20887,36840:21104,36841:22478,36842:22580,36843:22732,36844:23330,36845:24120,36846:24773,36847:25854,36848:26465,36849:26454,36850:27972,36851:29366,36852:30067,36853:31331,36854:33976,36855:35698,36856:37304,36857:37664,36858:22065,36859:22516,36860:39166,36928:25325,36929:26893,36930:27542,36931:29165,36932:32340,36933:32887,36934:33394,36935:35302,36936:39135,36937:34645,36938:36785,36939:23611,36940:20280,36941:20449,36942:20405,36943:21767,36944:23072,36945:23517,36946:23529,36947:24515,36948:24910,36949:25391,36950:26032,36951:26187,36952:26862,36953:27035,36954:28024,36955:28145,36956:30003,36957:30137,36958:30495,36959:31070,36960:31206,36961:32051,36962:33251,36963:33455,36964:34218,36965:35242,36966:35386,36967:36523,36968:36763,36969:36914,36970:37341,36971:38663,36972:20154,36973:20161,36974:20995,36975:22645,36976:22764,36977:23563,36978:29978,36979:23613,36980:33102,36981:35338,36982:36805,36983:38499,36984:38765,36985:31525,36986:35535,36987:38920,36988:37218,36989:22259,36990:21416,36992:36887,36993:21561,36994:22402,36995:24101,36996:25512,36997:27700,36998:28810,36999:30561,37e3:31883,37001:32736,37002:34928,37003:36930,37004:37204,37005:37648,37006:37656,37007:38543,37008:29790,37009:39620,37010:23815,37011:23913,37012:25968,37013:26530,37014:36264,37015:38619,37016:25454,37017:26441,37018:26905,37019:33733,37020:38935,37021:38592,37022:35070,37023:28548,37024:25722,37025:23544,37026:19990,37027:28716,37028:30045,37029:26159,37030:20932,37031:21046,37032:21218,37033:22995,37034:24449,37035:24615,37036:25104,37037:25919,37038:25972,37039:26143,37040:26228,37041:26866,37042:26646,37043:27491,37044:28165,37045:29298,37046:29983,37047:30427,37048:31934,37049:32854,37050:22768,37051:35069,37052:35199,37053:35488,37054:35475,37055:35531,37056:36893,37057:37266,37058:38738,37059:38745,37060:25993,37061:31246,37062:33030,37063:38587,37064:24109,37065:24796,37066:25114,37067:26021,37068:26132,37069:26512,37070:30707,37071:31309,37072:31821,37073:32318,37074:33034,37075:36012,37076:36196,37077:36321,37078:36447,37079:30889,37080:20999,37081:25305,37082:25509,37083:25666,37084:25240,37085:35373,37086:31363,37087:31680,37088:35500,37089:38634,37090:32118,37091:33292,37092:34633,37093:20185,37094:20808,37095:21315,37096:21344,37097:23459,37098:23554,37099:23574,37100:24029,37101:25126,37102:25159,37103:25776,37104:26643,37105:26676,37106:27849,37107:27973,37108:27927,37109:26579,37110:28508,37111:29006,37112:29053,37113:26059,37114:31359,37115:31661,37116:32218,37184:32330,37185:32680,37186:33146,37187:33307,37188:33337,37189:34214,37190:35438,37191:36046,37192:36341,37193:36984,37194:36983,37195:37549,37196:37521,37197:38275,37198:39854,37199:21069,37200:21892,37201:28472,37202:28982,37203:20840,37204:31109,37205:32341,37206:33203,37207:31950,37208:22092,37209:22609,37210:23720,37211:25514,37212:26366,37213:26365,37214:26970,37215:29401,37216:30095,37217:30094,37218:30990,37219:31062,37220:31199,37221:31895,37222:32032,37223:32068,37224:34311,37225:35380,37226:38459,37227:36961,37228:40736,37229:20711,37230:21109,37231:21452,37232:21474,37233:20489,37234:21930,37235:22766,37236:22863,37237:29245,37238:23435,37239:23652,37240:21277,37241:24803,37242:24819,37243:25436,37244:25475,37245:25407,37246:25531,37248:25805,37249:26089,37250:26361,37251:24035,37252:27085,37253:27133,37254:28437,37255:29157,37256:20105,37257:30185,37258:30456,37259:31379,37260:31967,37261:32207,37262:32156,37263:32865,37264:33609,37265:33624,37266:33900,37267:33980,37268:34299,37269:35013,37270:36208,37271:36865,37272:36973,37273:37783,37274:38684,37275:39442,37276:20687,37277:22679,37278:24974,37279:33235,37280:34101,37281:36104,37282:36896,37283:20419,37284:20596,37285:21063,37286:21363,37287:24687,37288:25417,37289:26463,37290:28204,37291:36275,37292:36895,37293:20439,37294:23646,37295:36042,37296:26063,37297:32154,37298:21330,37299:34966,37300:20854,37301:25539,37302:23384,37303:23403,37304:23562,37305:25613,37306:26449,37307:36956,37308:20182,37309:22810,37310:22826,37311:27760,37312:35409,37313:21822,37314:22549,37315:22949,37316:24816,37317:25171,37318:26561,37319:33333,37320:26965,37321:38464,37322:39364,37323:39464,37324:20307,37325:22534,37326:23550,37327:32784,37328:23729,37329:24111,37330:24453,37331:24608,37332:24907,37333:25140,37334:26367,37335:27888,37336:28382,37337:32974,37338:33151,37339:33492,37340:34955,37341:36024,37342:36864,37343:36910,37344:38538,37345:40667,37346:39899,37347:20195,37348:21488,37349:22823,37350:31532,37351:37261,37352:38988,37353:40441,37354:28381,37355:28711,37356:21331,37357:21828,37358:23429,37359:25176,37360:25246,37361:25299,37362:27810,37363:28655,37364:29730,37365:35351,37366:37944,37367:28609,37368:35582,37369:33592,37370:20967,37371:34552,37372:21482,37440:21481,37441:20294,37442:36948,37443:36784,37444:22890,37445:33073,37446:24061,37447:31466,37448:36799,37449:26842,37450:35895,37451:29432,37452:40008,37453:27197,37454:35504,37455:20025,37456:21336,37457:22022,37458:22374,37459:25285,37460:25506,37461:26086,37462:27470,37463:28129,37464:28251,37465:28845,37466:30701,37467:31471,37468:31658,37469:32187,37470:32829,37471:32966,37472:34507,37473:35477,37474:37723,37475:22243,37476:22727,37477:24382,37478:26029,37479:26262,37480:27264,37481:27573,37482:30007,37483:35527,37484:20516,37485:30693,37486:22320,37487:24347,37488:24677,37489:26234,37490:27744,37491:30196,37492:31258,37493:32622,37494:33268,37495:34584,37496:36933,37497:39347,37498:31689,37499:30044,37500:31481,37501:31569,37502:33988,37504:36880,37505:31209,37506:31378,37507:33590,37508:23265,37509:30528,37510:20013,37511:20210,37512:23449,37513:24544,37514:25277,37515:26172,37516:26609,37517:27880,37518:34411,37519:34935,37520:35387,37521:37198,37522:37619,37523:39376,37524:27159,37525:28710,37526:29482,37527:33511,37528:33879,37529:36015,37530:19969,37531:20806,37532:20939,37533:21899,37534:23541,37535:24086,37536:24115,37537:24193,37538:24340,37539:24373,37540:24427,37541:24500,37542:25074,37543:25361,37544:26274,37545:26397,37546:28526,37547:29266,37548:30010,37549:30522,37550:32884,37551:33081,37552:33144,37553:34678,37554:35519,37555:35548,37556:36229,37557:36339,37558:37530,37559:38263,37560:38914,37561:40165,37562:21189,37563:25431,37564:30452,37565:26389,37566:27784,37567:29645,37568:36035,37569:37806,37570:38515,37571:27941,37572:22684,37573:26894,37574:27084,37575:36861,37576:37786,37577:30171,37578:36890,37579:22618,37580:26626,37581:25524,37582:27131,37583:20291,37584:28460,37585:26584,37586:36795,37587:34086,37588:32180,37589:37716,37590:26943,37591:28528,37592:22378,37593:22775,37594:23340,37595:32044,37596:29226,37597:21514,37598:37347,37599:40372,37600:20141,37601:20302,37602:20572,37603:20597,37604:21059,37605:35998,37606:21576,37607:22564,37608:23450,37609:24093,37610:24213,37611:24237,37612:24311,37613:24351,37614:24716,37615:25269,37616:25402,37617:25552,37618:26799,37619:27712,37620:30855,37621:31118,37622:31243,37623:32224,37624:33351,37625:35330,37626:35558,37627:36420,37628:36883,37696:37048,37697:37165,37698:37336,37699:40718,37700:27877,37701:25688,37702:25826,37703:25973,37704:28404,37705:30340,37706:31515,37707:36969,37708:37841,37709:28346,37710:21746,37711:24505,37712:25764,37713:36685,37714:36845,37715:37444,37716:20856,37717:22635,37718:22825,37719:23637,37720:24215,37721:28155,37722:32399,37723:29980,37724:36028,37725:36578,37726:39003,37727:28857,37728:20253,37729:27583,37730:28593,37731:3e4,37732:38651,37733:20814,37734:21520,37735:22581,37736:22615,37737:22956,37738:23648,37739:24466,37740:26007,37741:26460,37742:28193,37743:30331,37744:33759,37745:36077,37746:36884,37747:37117,37748:37709,37749:30757,37750:30778,37751:21162,37752:24230,37753:22303,37754:22900,37755:24594,37756:20498,37757:20826,37758:20908,37760:20941,37761:20992,37762:21776,37763:22612,37764:22616,37765:22871,37766:23445,37767:23798,37768:23947,37769:24764,37770:25237,37771:25645,37772:26481,37773:26691,37774:26812,37775:26847,37776:30423,37777:28120,37778:28271,37779:28059,37780:28783,37781:29128,37782:24403,37783:30168,37784:31095,37785:31561,37786:31572,37787:31570,37788:31958,37789:32113,37790:21040,37791:33891,37792:34153,37793:34276,37794:35342,37795:35588,37796:35910,37797:36367,37798:36867,37799:36879,37800:37913,37801:38518,37802:38957,37803:39472,37804:38360,37805:20685,37806:21205,37807:21516,37808:22530,37809:23566,37810:24999,37811:25758,37812:27934,37813:30643,37814:31461,37815:33012,37816:33796,37817:36947,37818:37509,37819:23776,37820:40199,37821:21311,37822:24471,37823:24499,37824:28060,37825:29305,37826:30563,37827:31167,37828:31716,37829:27602,37830:29420,37831:35501,37832:26627,37833:27233,37834:20984,37835:31361,37836:26932,37837:23626,37838:40182,37839:33515,37840:23493,37841:37193,37842:28702,37843:22136,37844:23663,37845:24775,37846:25958,37847:27788,37848:35930,37849:36929,37850:38931,37851:21585,37852:26311,37853:37389,37854:22856,37855:37027,37856:20869,37857:20045,37858:20970,37859:34201,37860:35598,37861:28760,37862:25466,37863:37707,37864:26978,37865:39348,37866:32260,37867:30071,37868:21335,37869:26976,37870:36575,37871:38627,37872:27741,37873:20108,37874:23612,37875:24336,37876:36841,37877:21250,37878:36049,37879:32905,37880:34425,37881:24319,37882:26085,37883:20083,37884:20837,37952:22914,37953:23615,37954:38894,37955:20219,37956:22922,37957:24525,37958:35469,37959:28641,37960:31152,37961:31074,37962:23527,37963:33905,37964:29483,37965:29105,37966:24180,37967:24565,37968:25467,37969:25754,37970:29123,37971:31896,37972:20035,37973:24316,37974:20043,37975:22492,37976:22178,37977:24745,37978:28611,37979:32013,37980:33021,37981:33075,37982:33215,37983:36786,37984:35223,37985:34468,37986:24052,37987:25226,37988:25773,37989:35207,37990:26487,37991:27874,37992:27966,37993:29750,37994:30772,37995:23110,37996:32629,37997:33453,37998:39340,37999:20467,38e3:24259,38001:25309,38002:25490,38003:25943,38004:26479,38005:30403,38006:29260,38007:32972,38008:32954,38009:36649,38010:37197,38011:20493,38012:22521,38013:23186,38014:26757,38016:26995,38017:29028,38018:29437,38019:36023,38020:22770,38021:36064,38022:38506,38023:36889,38024:34687,38025:31204,38026:30695,38027:33833,38028:20271,38029:21093,38030:21338,38031:25293,38032:26575,38033:27850,38034:30333,38035:31636,38036:31893,38037:33334,38038:34180,38039:36843,38040:26333,38041:28448,38042:29190,38043:32283,38044:33707,38045:39361,38046:40614,38047:20989,38048:31665,38049:30834,38050:31672,38051:32903,38052:31560,38053:27368,38054:24161,38055:32908,38056:30033,38057:30048,38058:20843,38059:37474,38060:28300,38061:30330,38062:37271,38063:39658,38064:20240,38065:32624,38066:25244,38067:31567,38068:38309,38069:40169,38070:22138,38071:22617,38072:34532,38073:38588,38074:20276,38075:21028,38076:21322,38077:21453,38078:21467,38079:24070,38080:25644,38081:26001,38082:26495,38083:27710,38084:27726,38085:29256,38086:29359,38087:29677,38088:30036,38089:32321,38090:33324,38091:34281,38092:36009,38093:31684,38094:37318,38095:29033,38096:38930,38097:39151,38098:25405,38099:26217,38100:30058,38101:30436,38102:30928,38103:34115,38104:34542,38105:21290,38106:21329,38107:21542,38108:22915,38109:24199,38110:24444,38111:24754,38112:25161,38113:25209,38114:25259,38115:26e3,38116:27604,38117:27852,38118:30130,38119:30382,38120:30865,38121:31192,38122:32203,38123:32631,38124:32933,38125:34987,38126:35513,38127:36027,38128:36991,38129:38750,38130:39131,38131:27147,38132:31800,38133:20633,38134:23614,38135:24494,38136:26503,38137:27608,38138:29749,38139:30473,38140:32654,38208:40763,38209:26570,38210:31255,38211:21305,38212:30091,38213:39661,38214:24422,38215:33181,38216:33777,38217:32920,38218:24380,38219:24517,38220:30050,38221:31558,38222:36924,38223:26727,38224:23019,38225:23195,38226:32016,38227:30334,38228:35628,38229:20469,38230:24426,38231:27161,38232:27703,38233:28418,38234:29922,38235:31080,38236:34920,38237:35413,38238:35961,38239:24287,38240:25551,38241:30149,38242:31186,38243:33495,38244:37672,38245:37618,38246:33948,38247:34541,38248:39981,38249:21697,38250:24428,38251:25996,38252:27996,38253:28693,38254:36007,38255:36051,38256:38971,38257:25935,38258:29942,38259:19981,38260:20184,38261:22496,38262:22827,38263:23142,38264:23500,38265:20904,38266:24067,38267:24220,38268:24598,38269:25206,38270:25975,38272:26023,38273:26222,38274:28014,38275:29238,38276:31526,38277:33104,38278:33178,38279:33433,38280:35676,38281:36e3,38282:36070,38283:36212,38284:38428,38285:38468,38286:20398,38287:25771,38288:27494,38289:33310,38290:33889,38291:34154,38292:37096,38293:23553,38294:26963,38295:39080,38296:33914,38297:34135,38298:20239,38299:21103,38300:24489,38301:24133,38302:26381,38303:31119,38304:33145,38305:35079,38306:35206,38307:28149,38308:24343,38309:25173,38310:27832,38311:20175,38312:29289,38313:39826,38314:20998,38315:21563,38316:22132,38317:22707,38318:24996,38319:25198,38320:28954,38321:22894,38322:31881,38323:31966,38324:32027,38325:38640,38326:25991,38327:32862,38328:19993,38329:20341,38330:20853,38331:22592,38332:24163,38333:24179,38334:24330,38335:26564,38336:20006,38337:34109,38338:38281,38339:38491,38340:31859,38341:38913,38342:20731,38343:22721,38344:30294,38345:30887,38346:21029,38347:30629,38348:34065,38349:31622,38350:20559,38351:22793,38352:29255,38353:31687,38354:32232,38355:36794,38356:36820,38357:36941,38358:20415,38359:21193,38360:23081,38361:24321,38362:38829,38363:20445,38364:33303,38365:37610,38366:22275,38367:25429,38368:27497,38369:29995,38370:35036,38371:36628,38372:31298,38373:21215,38374:22675,38375:24917,38376:25098,38377:26286,38378:27597,38379:31807,38380:33769,38381:20515,38382:20472,38383:21253,38384:21574,38385:22577,38386:22857,38387:23453,38388:23792,38389:23791,38390:23849,38391:24214,38392:25265,38393:25447,38394:25918,38395:26041,38396:26379,38464:27861,38465:27873,38466:28921,38467:30770,38468:32299,38469:32990,38470:33459,38471:33804,38472:34028,38473:34562,38474:35090,38475:35370,38476:35914,38477:37030,38478:37586,38479:39165,38480:40179,38481:40300,38482:20047,38483:20129,38484:20621,38485:21078,38486:22346,38487:22952,38488:24125,38489:24536,38490:24537,38491:25151,38492:26292,38493:26395,38494:26576,38495:26834,38496:20882,38497:32033,38498:32938,38499:33192,38500:35584,38501:35980,38502:36031,38503:37502,38504:38450,38505:21536,38506:38956,38507:21271,38508:20693,38509:21340,38510:22696,38511:25778,38512:26420,38513:29287,38514:30566,38515:31302,38516:37350,38517:21187,38518:27809,38519:27526,38520:22528,38521:24140,38522:22868,38523:26412,38524:32763,38525:20961,38526:30406,38528:25705,38529:30952,38530:39764,38531:40635,38532:22475,38533:22969,38534:26151,38535:26522,38536:27598,38537:21737,38538:27097,38539:24149,38540:33180,38541:26517,38542:39850,38543:26622,38544:40018,38545:26717,38546:20134,38547:20451,38548:21448,38549:25273,38550:26411,38551:27819,38552:36804,38553:20397,38554:32365,38555:40639,38556:19975,38557:24930,38558:28288,38559:28459,38560:34067,38561:21619,38562:26410,38563:39749,38564:24051,38565:31637,38566:23724,38567:23494,38568:34588,38569:28234,38570:34001,38571:31252,38572:33032,38573:22937,38574:31885,38575:27665,38576:30496,38577:21209,38578:22818,38579:28961,38580:29279,38581:30683,38582:38695,38583:40289,38584:26891,38585:23167,38586:23064,38587:20901,38588:21517,38589:21629,38590:26126,38591:30431,38592:36855,38593:37528,38594:40180,38595:23018,38596:29277,38597:28357,38598:20813,38599:26825,38600:32191,38601:32236,38602:38754,38603:40634,38604:25720,38605:27169,38606:33538,38607:22916,38608:23391,38609:27611,38610:29467,38611:30450,38612:32178,38613:32791,38614:33945,38615:20786,38616:26408,38617:40665,38618:30446,38619:26466,38620:21247,38621:39173,38622:23588,38623:25147,38624:31870,38625:36016,38626:21839,38627:24758,38628:32011,38629:38272,38630:21249,38631:20063,38632:20918,38633:22812,38634:29242,38635:32822,38636:37326,38637:24357,38638:30690,38639:21380,38640:24441,38641:32004,38642:34220,38643:35379,38644:36493,38645:38742,38646:26611,38647:34222,38648:37971,38649:24841,38650:24840,38651:27833,38652:30290,38720:35565,38721:36664,38722:21807,38723:20305,38724:20778,38725:21191,38726:21451,38727:23461,38728:24189,38729:24736,38730:24962,38731:25558,38732:26377,38733:26586,38734:28263,38735:28044,38736:29494,38737:29495,38738:30001,38739:31056,38740:35029,38741:35480,38742:36938,38743:37009,38744:37109,38745:38596,38746:34701,38747:22805,38748:20104,38749:20313,38750:19982,38751:35465,38752:36671,38753:38928,38754:20653,38755:24188,38756:22934,38757:23481,38758:24248,38759:25562,38760:25594,38761:25793,38762:26332,38763:26954,38764:27096,38765:27915,38766:28342,38767:29076,38768:29992,38769:31407,38770:32650,38771:32768,38772:33865,38773:33993,38774:35201,38775:35617,38776:36362,38777:36965,38778:38525,38779:39178,38780:24958,38781:25233,38782:27442,38784:27779,38785:28020,38786:32716,38787:32764,38788:28096,38789:32645,38790:34746,38791:35064,38792:26469,38793:33713,38794:38972,38795:38647,38796:27931,38797:32097,38798:33853,38799:37226,38800:20081,38801:21365,38802:23888,38803:27396,38804:28651,38805:34253,38806:34349,38807:35239,38808:21033,38809:21519,38810:23653,38811:26446,38812:26792,38813:29702,38814:29827,38815:30178,38816:35023,38817:35041,38818:37324,38819:38626,38820:38520,38821:24459,38822:29575,38823:31435,38824:33870,38825:25504,38826:30053,38827:21129,38828:27969,38829:28316,38830:29705,38831:30041,38832:30827,38833:31890,38834:38534,38835:31452,38836:40845,38837:20406,38838:24942,38839:26053,38840:34396,38841:20102,38842:20142,38843:20698,38844:20001,38845:20940,38846:23534,38847:26009,38848:26753,38849:28092,38850:29471,38851:30274,38852:30637,38853:31260,38854:31975,38855:33391,38856:35538,38857:36988,38858:37327,38859:38517,38860:38936,38861:21147,38862:32209,38863:20523,38864:21400,38865:26519,38866:28107,38867:29136,38868:29747,38869:33256,38870:36650,38871:38563,38872:40023,38873:40607,38874:29792,38875:22593,38876:28057,38877:32047,38878:39006,38879:20196,38880:20278,38881:20363,38882:20919,38883:21169,38884:23994,38885:24604,38886:29618,38887:31036,38888:33491,38889:37428,38890:38583,38891:38646,38892:38666,38893:40599,38894:40802,38895:26278,38896:27508,38897:21015,38898:21155,38899:28872,38900:35010,38901:24265,38902:24651,38903:24976,38904:28451,38905:29001,38906:31806,38907:32244,38908:32879,38976:34030,38977:36899,38978:37676,38979:21570,38980:39791,38981:27347,38982:28809,38983:36034,38984:36335,38985:38706,38986:21172,38987:23105,38988:24266,38989:24324,38990:26391,38991:27004,38992:27028,38993:28010,38994:28431,38995:29282,38996:29436,38997:31725,38998:32769,38999:32894,39e3:34635,39001:37070,39002:20845,39003:40595,39004:31108,39005:32907,39006:37682,39007:35542,39008:20525,39009:21644,39010:35441,39011:27498,39012:36036,39013:33031,39014:24785,39015:26528,39016:40434,39017:20121,39018:20120,39019:39952,39020:35435,39021:34241,39022:34152,39023:26880,39024:28286,39025:30871,39026:33109,39071:24332,39072:19984,39073:19989,39074:20010,39075:20017,39076:20022,39077:20028,39078:20031,39079:20034,39080:20054,39081:20056,39082:20098,39083:20101,39084:35947,39085:20106,39086:33298,39087:24333,39088:20110,39089:20126,39090:20127,39091:20128,39092:20130,39093:20144,39094:20147,39095:20150,39096:20174,39097:20173,39098:20164,39099:20166,39100:20162,39101:20183,39102:20190,39103:20205,39104:20191,39105:20215,39106:20233,39107:20314,39108:20272,39109:20315,39110:20317,39111:20311,39112:20295,39113:20342,39114:20360,39115:20367,39116:20376,39117:20347,39118:20329,39119:20336,39120:20369,39121:20335,39122:20358,39123:20374,39124:20760,39125:20436,39126:20447,39127:20430,39128:20440,39129:20443,39130:20433,39131:20442,39132:20432,39133:20452,39134:20453,39135:20506,39136:20520,39137:20500,39138:20522,39139:20517,39140:20485,39141:20252,39142:20470,39143:20513,39144:20521,39145:20524,39146:20478,39147:20463,39148:20497,39149:20486,39150:20547,39151:20551,39152:26371,39153:20565,39154:20560,39155:20552,39156:20570,39157:20566,39158:20588,39159:20600,39160:20608,39161:20634,39162:20613,39163:20660,39164:20658,39232:20681,39233:20682,39234:20659,39235:20674,39236:20694,39237:20702,39238:20709,39239:20717,39240:20707,39241:20718,39242:20729,39243:20725,39244:20745,39245:20737,39246:20738,39247:20758,39248:20757,39249:20756,39250:20762,39251:20769,39252:20794,39253:20791,39254:20796,39255:20795,39256:20799,39257:20800,39258:20818,39259:20812,39260:20820,39261:20834,39262:31480,39263:20841,39264:20842,39265:20846,39266:20864,39267:20866,39268:22232,39269:20876,39270:20873,39271:20879,39272:20881,39273:20883,39274:20885,39275:20886,39276:20900,39277:20902,39278:20898,39279:20905,39280:20906,39281:20907,39282:20915,39283:20913,39284:20914,39285:20912,39286:20917,39287:20925,39288:20933,39289:20937,39290:20955,39291:20960,39292:34389,39293:20969,39294:20973,39296:20976,39297:20981,39298:20990,39299:20996,39300:21003,39301:21012,39302:21006,39303:21031,39304:21034,39305:21038,39306:21043,39307:21049,39308:21071,39309:21060,39310:21067,39311:21068,39312:21086,39313:21076,39314:21098,39315:21108,39316:21097,39317:21107,39318:21119,39319:21117,39320:21133,39321:21140,39322:21138,39323:21105,39324:21128,39325:21137,39326:36776,39327:36775,39328:21164,39329:21165,39330:21180,39331:21173,39332:21185,39333:21197,39334:21207,39335:21214,39336:21219,39337:21222,39338:39149,39339:21216,39340:21235,39341:21237,39342:21240,39343:21241,39344:21254,39345:21256,39346:30008,39347:21261,39348:21264,39349:21263,39350:21269,39351:21274,39352:21283,39353:21295,39354:21297,39355:21299,39356:21304,39357:21312,39358:21318,39359:21317,39360:19991,39361:21321,39362:21325,39363:20950,39364:21342,39365:21353,39366:21358,39367:22808,39368:21371,39369:21367,39370:21378,39371:21398,39372:21408,39373:21414,39374:21413,39375:21422,39376:21424,39377:21430,39378:21443,39379:31762,39380:38617,39381:21471,39382:26364,39383:29166,39384:21486,39385:21480,39386:21485,39387:21498,39388:21505,39389:21565,39390:21568,39391:21548,39392:21549,39393:21564,39394:21550,39395:21558,39396:21545,39397:21533,39398:21582,39399:21647,39400:21621,39401:21646,39402:21599,39403:21617,39404:21623,39405:21616,39406:21650,39407:21627,39408:21632,39409:21622,39410:21636,39411:21648,39412:21638,39413:21703,39414:21666,39415:21688,39416:21669,39417:21676,39418:21700,39419:21704,39420:21672,39488:21675,39489:21698,39490:21668,39491:21694,39492:21692,39493:21720,39494:21733,39495:21734,39496:21775,39497:21780,39498:21757,39499:21742,39500:21741,39501:21754,39502:21730,39503:21817,39504:21824,39505:21859,39506:21836,39507:21806,39508:21852,39509:21829,39510:21846,39511:21847,39512:21816,39513:21811,39514:21853,39515:21913,39516:21888,39517:21679,39518:21898,39519:21919,39520:21883,39521:21886,39522:21912,39523:21918,39524:21934,39525:21884,39526:21891,39527:21929,39528:21895,39529:21928,39530:21978,39531:21957,39532:21983,39533:21956,39534:21980,39535:21988,39536:21972,39537:22036,39538:22007,39539:22038,39540:22014,39541:22013,39542:22043,39543:22009,39544:22094,39545:22096,39546:29151,39547:22068,39548:22070,39549:22066,39550:22072,39552:22123,39553:22116,39554:22063,39555:22124,39556:22122,39557:22150,39558:22144,39559:22154,39560:22176,39561:22164,39562:22159,39563:22181,39564:22190,39565:22198,39566:22196,39567:22210,39568:22204,39569:22209,39570:22211,39571:22208,39572:22216,39573:22222,39574:22225,39575:22227,39576:22231,39577:22254,39578:22265,39579:22272,39580:22271,39581:22276,39582:22281,39583:22280,39584:22283,39585:22285,39586:22291,39587:22296,39588:22294,39589:21959,39590:22300,39591:22310,39592:22327,39593:22328,39594:22350,39595:22331,39596:22336,39597:22351,39598:22377,39599:22464,39600:22408,39601:22369,39602:22399,39603:22409,39604:22419,39605:22432,39606:22451,39607:22436,39608:22442,39609:22448,39610:22467,39611:22470,39612:22484,39613:22482,39614:22483,39615:22538,39616:22486,39617:22499,39618:22539,39619:22553,39620:22557,39621:22642,39622:22561,39623:22626,39624:22603,39625:22640,39626:27584,39627:22610,39628:22589,39629:22649,39630:22661,39631:22713,39632:22687,39633:22699,39634:22714,39635:22750,39636:22715,39637:22712,39638:22702,39639:22725,39640:22739,39641:22737,39642:22743,39643:22745,39644:22744,39645:22757,39646:22748,39647:22756,39648:22751,39649:22767,39650:22778,39651:22777,39652:22779,39653:22780,39654:22781,39655:22786,39656:22794,39657:22800,39658:22811,39659:26790,39660:22821,39661:22828,39662:22829,39663:22834,39664:22840,39665:22846,39666:31442,39667:22869,39668:22864,39669:22862,39670:22874,39671:22872,39672:22882,39673:22880,39674:22887,39675:22892,39676:22889,39744:22904,39745:22913,39746:22941,39747:20318,39748:20395,39749:22947,39750:22962,39751:22982,39752:23016,39753:23004,39754:22925,39755:23001,39756:23002,39757:23077,39758:23071,39759:23057,39760:23068,39761:23049,39762:23066,39763:23104,39764:23148,39765:23113,39766:23093,39767:23094,39768:23138,39769:23146,39770:23194,39771:23228,39772:23230,39773:23243,39774:23234,39775:23229,39776:23267,39777:23255,39778:23270,39779:23273,39780:23254,39781:23290,39782:23291,39783:23308,39784:23307,39785:23318,39786:23346,39787:23248,39788:23338,39789:23350,39790:23358,39791:23363,39792:23365,39793:23360,39794:23377,39795:23381,39796:23386,39797:23387,39798:23397,39799:23401,39800:23408,39801:23411,39802:23413,39803:23416,39804:25992,39805:23418,39806:23424,39808:23427,39809:23462,39810:23480,39811:23491,39812:23495,39813:23497,39814:23508,39815:23504,39816:23524,39817:23526,39818:23522,39819:23518,39820:23525,39821:23531,39822:23536,39823:23542,39824:23539,39825:23557,39826:23559,39827:23560,39828:23565,39829:23571,39830:23584,39831:23586,39832:23592,39833:23608,39834:23609,39835:23617,39836:23622,39837:23630,39838:23635,39839:23632,39840:23631,39841:23409,39842:23660,39843:23662,39844:20066,39845:23670,39846:23673,39847:23692,39848:23697,39849:23700,39850:22939,39851:23723,39852:23739,39853:23734,39854:23740,39855:23735,39856:23749,39857:23742,39858:23751,39859:23769,39860:23785,39861:23805,39862:23802,39863:23789,39864:23948,39865:23786,39866:23819,39867:23829,39868:23831,39869:23900,39870:23839,39871:23835,39872:23825,39873:23828,39874:23842,39875:23834,39876:23833,39877:23832,39878:23884,39879:23890,39880:23886,39881:23883,39882:23916,39883:23923,39884:23926,39885:23943,39886:23940,39887:23938,39888:23970,39889:23965,39890:23980,39891:23982,39892:23997,39893:23952,39894:23991,39895:23996,39896:24009,39897:24013,39898:24019,39899:24018,39900:24022,39901:24027,39902:24043,39903:24050,39904:24053,39905:24075,39906:24090,39907:24089,39908:24081,39909:24091,39910:24118,39911:24119,39912:24132,39913:24131,39914:24128,39915:24142,39916:24151,39917:24148,39918:24159,39919:24162,39920:24164,39921:24135,39922:24181,39923:24182,39924:24186,39925:40636,39926:24191,39927:24224,39928:24257,39929:24258,39930:24264,39931:24272,39932:24271,4e4:24278,40001:24291,40002:24285,40003:24282,40004:24283,40005:24290,40006:24289,40007:24296,40008:24297,40009:24300,40010:24305,40011:24307,40012:24304,40013:24308,40014:24312,40015:24318,40016:24323,40017:24329,40018:24413,40019:24412,40020:24331,40021:24337,40022:24342,40023:24361,40024:24365,40025:24376,40026:24385,40027:24392,40028:24396,40029:24398,40030:24367,40031:24401,40032:24406,40033:24407,40034:24409,40035:24417,40036:24429,40037:24435,40038:24439,40039:24451,40040:24450,40041:24447,40042:24458,40043:24456,40044:24465,40045:24455,40046:24478,40047:24473,40048:24472,40049:24480,40050:24488,40051:24493,40052:24508,40053:24534,40054:24571,40055:24548,40056:24568,40057:24561,40058:24541,40059:24755,40060:24575,40061:24609,40062:24672,40064:24601,40065:24592,40066:24617,40067:24590,40068:24625,40069:24603,40070:24597,40071:24619,40072:24614,40073:24591,40074:24634,40075:24666,40076:24641,40077:24682,40078:24695,40079:24671,40080:24650,40081:24646,40082:24653,40083:24675,40084:24643,40085:24676,40086:24642,40087:24684,40088:24683,40089:24665,40090:24705,40091:24717,40092:24807,40093:24707,40094:24730,40095:24708,40096:24731,40097:24726,40098:24727,40099:24722,40100:24743,40101:24715,40102:24801,40103:24760,40104:24800,40105:24787,40106:24756,40107:24560,40108:24765,40109:24774,40110:24757,40111:24792,40112:24909,40113:24853,40114:24838,40115:24822,40116:24823,40117:24832,40118:24820,40119:24826,40120:24835,40121:24865,40122:24827,40123:24817,40124:24845,40125:24846,40126:24903,40127:24894,40128:24872,40129:24871,40130:24906,40131:24895,40132:24892,40133:24876,40134:24884,40135:24893,40136:24898,40137:24900,40138:24947,40139:24951,40140:24920,40141:24921,40142:24922,40143:24939,40144:24948,40145:24943,40146:24933,40147:24945,40148:24927,40149:24925,40150:24915,40151:24949,40152:24985,40153:24982,40154:24967,40155:25004,40156:24980,40157:24986,40158:24970,40159:24977,40160:25003,40161:25006,40162:25036,40163:25034,40164:25033,40165:25079,40166:25032,40167:25027,40168:25030,40169:25018,40170:25035,40171:32633,40172:25037,40173:25062,40174:25059,40175:25078,40176:25082,40177:25076,40178:25087,40179:25085,40180:25084,40181:25086,40182:25088,40183:25096,40184:25097,40185:25101,40186:25100,40187:25108,40188:25115,40256:25118,40257:25121,40258:25130,40259:25134,40260:25136,40261:25138,40262:25139,40263:25153,40264:25166,40265:25182,40266:25187,40267:25179,40268:25184,40269:25192,40270:25212,40271:25218,40272:25225,40273:25214,40274:25234,40275:25235,40276:25238,40277:25300,40278:25219,40279:25236,40280:25303,40281:25297,40282:25275,40283:25295,40284:25343,40285:25286,40286:25812,40287:25288,40288:25308,40289:25292,40290:25290,40291:25282,40292:25287,40293:25243,40294:25289,40295:25356,40296:25326,40297:25329,40298:25383,40299:25346,40300:25352,40301:25327,40302:25333,40303:25424,40304:25406,40305:25421,40306:25628,40307:25423,40308:25494,40309:25486,40310:25472,40311:25515,40312:25462,40313:25507,40314:25487,40315:25481,40316:25503,40317:25525,40318:25451,40320:25449,40321:25534,40322:25577,40323:25536,40324:25542,40325:25571,40326:25545,40327:25554,40328:25590,40329:25540,40330:25622,40331:25652,40332:25606,40333:25619,40334:25638,40335:25654,40336:25885,40337:25623,40338:25640,40339:25615,40340:25703,40341:25711,40342:25718,40343:25678,40344:25898,40345:25749,40346:25747,40347:25765,40348:25769,40349:25736,40350:25788,40351:25818,40352:25810,40353:25797,40354:25799,40355:25787,40356:25816,40357:25794,40358:25841,40359:25831,40360:33289,40361:25824,40362:25825,40363:25260,40364:25827,40365:25839,40366:25900,40367:25846,40368:25844,40369:25842,40370:25850,40371:25856,40372:25853,40373:25880,40374:25884,40375:25861,40376:25892,40377:25891,40378:25899,40379:25908,40380:25909,40381:25911,40382:25910,40383:25912,40384:30027,40385:25928,40386:25942,40387:25941,40388:25933,40389:25944,40390:25950,40391:25949,40392:25970,40393:25976,40394:25986,40395:25987,40396:35722,40397:26011,40398:26015,40399:26027,40400:26039,40401:26051,40402:26054,40403:26049,40404:26052,40405:26060,40406:26066,40407:26075,40408:26073,40409:26080,40410:26081,40411:26097,40412:26482,40413:26122,40414:26115,40415:26107,40416:26483,40417:26165,40418:26166,40419:26164,40420:26140,40421:26191,40422:26180,40423:26185,40424:26177,40425:26206,40426:26205,40427:26212,40428:26215,40429:26216,40430:26207,40431:26210,40432:26224,40433:26243,40434:26248,40435:26254,40436:26249,40437:26244,40438:26264,40439:26269,40440:26305,40441:26297,40442:26313,40443:26302,40444:26300,40512:26308,40513:26296,40514:26326,40515:26330,40516:26336,40517:26175,40518:26342,40519:26345,40520:26352,40521:26357,40522:26359,40523:26383,40524:26390,40525:26398,40526:26406,40527:26407,40528:38712,40529:26414,40530:26431,40531:26422,40532:26433,40533:26424,40534:26423,40535:26438,40536:26462,40537:26464,40538:26457,40539:26467,40540:26468,40541:26505,40542:26480,40543:26537,40544:26492,40545:26474,40546:26508,40547:26507,40548:26534,40549:26529,40550:26501,40551:26551,40552:26607,40553:26548,40554:26604,40555:26547,40556:26601,40557:26552,40558:26596,40559:26590,40560:26589,40561:26594,40562:26606,40563:26553,40564:26574,40565:26566,40566:26599,40567:27292,40568:26654,40569:26694,40570:26665,40571:26688,40572:26701,40573:26674,40574:26702,40576:26803,40577:26667,40578:26713,40579:26723,40580:26743,40581:26751,40582:26783,40583:26767,40584:26797,40585:26772,40586:26781,40587:26779,40588:26755,40589:27310,40590:26809,40591:26740,40592:26805,40593:26784,40594:26810,40595:26895,40596:26765,40597:26750,40598:26881,40599:26826,40600:26888,40601:26840,40602:26914,40603:26918,40604:26849,40605:26892,40606:26829,40607:26836,40608:26855,40609:26837,40610:26934,40611:26898,40612:26884,40613:26839,40614:26851,40615:26917,40616:26873,40617:26848,40618:26863,40619:26920,40620:26922,40621:26906,40622:26915,40623:26913,40624:26822,40625:27001,40626:26999,40627:26972,40628:27e3,40629:26987,40630:26964,40631:27006,40632:26990,40633:26937,40634:26996,40635:26941,40636:26969,40637:26928,40638:26977,40639:26974,40640:26973,40641:27009,40642:26986,40643:27058,40644:27054,40645:27088,40646:27071,40647:27073,40648:27091,40649:27070,40650:27086,40651:23528,40652:27082,40653:27101,40654:27067,40655:27075,40656:27047,40657:27182,40658:27025,40659:27040,40660:27036,40661:27029,40662:27060,40663:27102,40664:27112,40665:27138,40666:27163,40667:27135,40668:27402,40669:27129,40670:27122,40671:27111,40672:27141,40673:27057,40674:27166,40675:27117,40676:27156,40677:27115,40678:27146,40679:27154,40680:27329,40681:27171,40682:27155,40683:27204,40684:27148,40685:27250,40686:27190,40687:27256,40688:27207,40689:27234,40690:27225,40691:27238,40692:27208,40693:27192,40694:27170,40695:27280,40696:27277,40697:27296,40698:27268,40699:27298,40700:27299,40768:27287,40769:34327,40770:27323,40771:27331,40772:27330,40773:27320,40774:27315,40775:27308,40776:27358,40777:27345,40778:27359,40779:27306,40780:27354,40781:27370,40782:27387,40783:27397,40784:34326,40785:27386,40786:27410,40787:27414,40788:39729,40789:27423,40790:27448,40791:27447,40792:30428,40793:27449,40794:39150,40795:27463,40796:27459,40797:27465,40798:27472,40799:27481,40800:27476,40801:27483,40802:27487,40803:27489,40804:27512,40805:27513,40806:27519,40807:27520,40808:27524,40809:27523,40810:27533,40811:27544,40812:27541,40813:27550,40814:27556,40815:27562,40816:27563,40817:27567,40818:27570,40819:27569,40820:27571,40821:27575,40822:27580,40823:27590,40824:27595,40825:27603,40826:27615,40827:27628,40828:27627,40829:27635,40830:27631,40832:40638,40833:27656,40834:27667,40835:27668,40836:27675,40837:27684,40838:27683,40839:27742,40840:27733,40841:27746,40842:27754,40843:27778,40844:27789,40845:27802,40846:27777,40847:27803,40848:27774,40849:27752,40850:27763,40851:27794,40852:27792,40853:27844,40854:27889,40855:27859,40856:27837,40857:27863,40858:27845,40859:27869,40860:27822,40861:27825,40862:27838,40863:27834,40864:27867,40865:27887,40866:27865,40867:27882,40868:27935,40869:34893,40870:27958,40871:27947,40872:27965,40873:27960,40874:27929,40875:27957,40876:27955,40877:27922,40878:27916,40879:28003,40880:28051,40881:28004,40882:27994,40883:28025,40884:27993,40885:28046,40886:28053,40887:28644,40888:28037,40889:28153,40890:28181,40891:28170,40892:28085,40893:28103,40894:28134,40895:28088,40896:28102,40897:28140,40898:28126,40899:28108,40900:28136,40901:28114,40902:28101,40903:28154,40904:28121,40905:28132,40906:28117,40907:28138,40908:28142,40909:28205,40910:28270,40911:28206,40912:28185,40913:28274,40914:28255,40915:28222,40916:28195,40917:28267,40918:28203,40919:28278,40920:28237,40921:28191,40922:28227,40923:28218,40924:28238,40925:28196,40926:28415,40927:28189,40928:28216,40929:28290,40930:28330,40931:28312,40932:28361,40933:28343,40934:28371,40935:28349,40936:28335,40937:28356,40938:28338,40939:28372,40940:28373,40941:28303,40942:28325,40943:28354,40944:28319,40945:28481,40946:28433,40947:28748,40948:28396,40949:28408,40950:28414,40951:28479,40952:28402,40953:28465,40954:28399,40955:28466,40956:28364,161:65377,162:65378,163:65379,164:65380,165:65381,166:65382,167:65383,168:65384,169:65385,170:65386,171:65387,172:65388,173:65389,174:65390,175:65391,176:65392,177:65393,178:65394,179:65395,180:65396,181:65397,182:65398,183:65399,184:65400,185:65401,186:65402,187:65403,188:65404,189:65405,190:65406,191:65407,192:65408,193:65409,194:65410,195:65411,196:65412,197:65413,198:65414,199:65415,200:65416,201:65417,202:65418,203:65419,204:65420,205:65421,206:65422,207:65423,208:65424,209:65425,210:65426,211:65427,212:65428,213:65429,214:65430,215:65431,216:65432,217:65433,218:65434,219:65435,220:65436,221:65437,222:65438,223:65439,57408:28478,57409:28435,57410:28407,57411:28550,57412:28538,57413:28536,57414:28545,57415:28544,57416:28527,57417:28507,57418:28659,57419:28525,57420:28546,57421:28540,57422:28504,57423:28558,57424:28561,57425:28610,57426:28518,57427:28595,57428:28579,57429:28577,57430:28580,57431:28601,57432:28614,57433:28586,57434:28639,57435:28629,57436:28652,57437:28628,57438:28632,57439:28657,57440:28654,57441:28635,57442:28681,57443:28683,57444:28666,57445:28689,57446:28673,57447:28687,57448:28670,57449:28699,57450:28698,57451:28532,57452:28701,57453:28696,57454:28703,57455:28720,57456:28734,57457:28722,57458:28753,57459:28771,57460:28825,57461:28818,57462:28847,57463:28913,57464:28844,57465:28856,57466:28851,57467:28846,57468:28895,57469:28875,57470:28893,57472:28889,57473:28937,57474:28925,57475:28956,57476:28953,57477:29029,57478:29013,57479:29064,57480:29030,57481:29026,57482:29004,57483:29014,57484:29036,57485:29071,57486:29179,57487:29060,57488:29077,57489:29096,57490:29100,57491:29143,57492:29113,57493:29118,57494:29138,57495:29129,57496:29140,57497:29134,57498:29152,57499:29164,57500:29159,57501:29173,57502:29180,57503:29177,57504:29183,57505:29197,57506:29200,57507:29211,57508:29224,57509:29229,57510:29228,57511:29232,57512:29234,57513:29243,57514:29244,57515:29247,57516:29248,57517:29254,57518:29259,57519:29272,57520:29300,57521:29310,57522:29314,57523:29313,57524:29319,57525:29330,57526:29334,57527:29346,57528:29351,57529:29369,57530:29362,57531:29379,57532:29382,57533:29380,57534:29390,57535:29394,57536:29410,57537:29408,57538:29409,57539:29433,57540:29431,57541:20495,57542:29463,57543:29450,57544:29468,57545:29462,57546:29469,57547:29492,57548:29487,57549:29481,57550:29477,57551:29502,57552:29518,57553:29519,57554:40664,57555:29527,57556:29546,57557:29544,57558:29552,57559:29560,57560:29557,57561:29563,57562:29562,57563:29640,57564:29619,57565:29646,57566:29627,57567:29632,57568:29669,57569:29678,57570:29662,57571:29858,57572:29701,57573:29807,57574:29733,57575:29688,57576:29746,57577:29754,57578:29781,57579:29759,57580:29791,57581:29785,57582:29761,57583:29788,57584:29801,57585:29808,57586:29795,57587:29802,57588:29814,57589:29822,57590:29835,57591:29854,57592:29863,57593:29898,57594:29903,57595:29908,57596:29681,57664:29920,57665:29923,57666:29927,57667:29929,57668:29934,57669:29938,57670:29936,57671:29937,57672:29944,57673:29943,57674:29956,57675:29955,57676:29957,57677:29964,57678:29966,57679:29965,57680:29973,57681:29971,57682:29982,57683:29990,57684:29996,57685:30012,57686:30020,57687:30029,57688:30026,57689:30025,57690:30043,57691:30022,57692:30042,57693:30057,57694:30052,57695:30055,57696:30059,57697:30061,57698:30072,57699:30070,57700:30086,57701:30087,57702:30068,57703:30090,57704:30089,57705:30082,57706:30100,57707:30106,57708:30109,57709:30117,57710:30115,57711:30146,57712:30131,57713:30147,57714:30133,57715:30141,57716:30136,57717:30140,57718:30129,57719:30157,57720:30154,57721:30162,57722:30169,57723:30179,57724:30174,57725:30206,57726:30207,57728:30204,57729:30209,57730:30192,57731:30202,57732:30194,57733:30195,57734:30219,57735:30221,57736:30217,57737:30239,57738:30247,57739:30240,57740:30241,57741:30242,57742:30244,57743:30260,57744:30256,57745:30267,57746:30279,57747:30280,57748:30278,57749:30300,57750:30296,57751:30305,57752:30306,57753:30312,57754:30313,57755:30314,57756:30311,57757:30316,57758:30320,57759:30322,57760:30326,57761:30328,57762:30332,57763:30336,57764:30339,57765:30344,57766:30347,57767:30350,57768:30358,57769:30355,57770:30361,57771:30362,57772:30384,57773:30388,57774:30392,57775:30393,57776:30394,57777:30402,57778:30413,57779:30422,57780:30418,57781:30430,57782:30433,57783:30437,57784:30439,57785:30442,57786:34351,57787:30459,57788:30472,57789:30471,57790:30468,57791:30505,57792:30500,57793:30494,57794:30501,57795:30502,57796:30491,57797:30519,57798:30520,57799:30535,57800:30554,57801:30568,57802:30571,57803:30555,57804:30565,57805:30591,57806:30590,57807:30585,57808:30606,57809:30603,57810:30609,57811:30624,57812:30622,57813:30640,57814:30646,57815:30649,57816:30655,57817:30652,57818:30653,57819:30651,57820:30663,57821:30669,57822:30679,57823:30682,57824:30684,57825:30691,57826:30702,57827:30716,57828:30732,57829:30738,57830:31014,57831:30752,57832:31018,57833:30789,57834:30862,57835:30836,57836:30854,57837:30844,57838:30874,57839:30860,57840:30883,57841:30901,57842:30890,57843:30895,57844:30929,57845:30918,57846:30923,57847:30932,57848:30910,57849:30908,57850:30917,57851:30922,57852:30956,57920:30951,57921:30938,57922:30973,57923:30964,57924:30983,57925:30994,57926:30993,57927:31001,57928:31020,57929:31019,57930:31040,57931:31072,57932:31063,57933:31071,57934:31066,57935:31061,57936:31059,57937:31098,57938:31103,57939:31114,57940:31133,57941:31143,57942:40779,57943:31146,57944:31150,57945:31155,57946:31161,57947:31162,57948:31177,57949:31189,57950:31207,57951:31212,57952:31201,57953:31203,57954:31240,57955:31245,57956:31256,57957:31257,57958:31264,57959:31263,57960:31104,57961:31281,57962:31291,57963:31294,57964:31287,57965:31299,57966:31319,57967:31305,57968:31329,57969:31330,57970:31337,57971:40861,57972:31344,57973:31353,57974:31357,57975:31368,57976:31383,57977:31381,57978:31384,57979:31382,57980:31401,57981:31432,57982:31408,57984:31414,57985:31429,57986:31428,57987:31423,57988:36995,57989:31431,57990:31434,57991:31437,57992:31439,57993:31445,57994:31443,57995:31449,57996:31450,57997:31453,57998:31457,57999:31458,58e3:31462,58001:31469,58002:31472,58003:31490,58004:31503,58005:31498,58006:31494,58007:31539,58008:31512,58009:31513,58010:31518,58011:31541,58012:31528,58013:31542,58014:31568,58015:31610,58016:31492,58017:31565,58018:31499,58019:31564,58020:31557,58021:31605,58022:31589,58023:31604,58024:31591,58025:31600,58026:31601,58027:31596,58028:31598,58029:31645,58030:31640,58031:31647,58032:31629,58033:31644,58034:31642,58035:31627,58036:31634,58037:31631,58038:31581,58039:31641,58040:31691,58041:31681,58042:31692,58043:31695,58044:31668,58045:31686,58046:31709,58047:31721,58048:31761,58049:31764,58050:31718,58051:31717,58052:31840,58053:31744,58054:31751,58055:31763,58056:31731,58057:31735,58058:31767,58059:31757,58060:31734,58061:31779,58062:31783,58063:31786,58064:31775,58065:31799,58066:31787,58067:31805,58068:31820,58069:31811,58070:31828,58071:31823,58072:31808,58073:31824,58074:31832,58075:31839,58076:31844,58077:31830,58078:31845,58079:31852,58080:31861,58081:31875,58082:31888,58083:31908,58084:31917,58085:31906,58086:31915,58087:31905,58088:31912,58089:31923,58090:31922,58091:31921,58092:31918,58093:31929,58094:31933,58095:31936,58096:31941,58097:31938,58098:31960,58099:31954,58100:31964,58101:31970,58102:39739,58103:31983,58104:31986,58105:31988,58106:31990,58107:31994,58108:32006,58176:32002,58177:32028,58178:32021,58179:32010,58180:32069,58181:32075,58182:32046,58183:32050,58184:32063,58185:32053,58186:32070,58187:32115,58188:32086,58189:32078,58190:32114,58191:32104,58192:32110,58193:32079,58194:32099,58195:32147,58196:32137,58197:32091,58198:32143,58199:32125,58200:32155,58201:32186,58202:32174,58203:32163,58204:32181,58205:32199,58206:32189,58207:32171,58208:32317,58209:32162,58210:32175,58211:32220,58212:32184,58213:32159,58214:32176,58215:32216,58216:32221,58217:32228,58218:32222,58219:32251,58220:32242,58221:32225,58222:32261,58223:32266,58224:32291,58225:32289,58226:32274,58227:32305,58228:32287,58229:32265,58230:32267,58231:32290,58232:32326,58233:32358,58234:32315,58235:32309,58236:32313,58237:32323,58238:32311,58240:32306,58241:32314,58242:32359,58243:32349,58244:32342,58245:32350,58246:32345,58247:32346,58248:32377,58249:32362,58250:32361,58251:32380,58252:32379,58253:32387,58254:32213,58255:32381,58256:36782,58257:32383,58258:32392,58259:32393,58260:32396,58261:32402,58262:32400,58263:32403,58264:32404,58265:32406,58266:32398,58267:32411,58268:32412,58269:32568,58270:32570,58271:32581,58272:32588,58273:32589,58274:32590,58275:32592,58276:32593,58277:32597,58278:32596,58279:32600,58280:32607,58281:32608,58282:32616,58283:32617,58284:32615,58285:32632,58286:32642,58287:32646,58288:32643,58289:32648,58290:32647,58291:32652,58292:32660,58293:32670,58294:32669,58295:32666,58296:32675,58297:32687,58298:32690,58299:32697,58300:32686,58301:32694,58302:32696,58303:35697,58304:32709,58305:32710,58306:32714,58307:32725,58308:32724,58309:32737,58310:32742,58311:32745,58312:32755,58313:32761,58314:39132,58315:32774,58316:32772,58317:32779,58318:32786,58319:32792,58320:32793,58321:32796,58322:32801,58323:32808,58324:32831,58325:32827,58326:32842,58327:32838,58328:32850,58329:32856,58330:32858,58331:32863,58332:32866,58333:32872,58334:32883,58335:32882,58336:32880,58337:32886,58338:32889,58339:32893,58340:32895,58341:32900,58342:32902,58343:32901,58344:32923,58345:32915,58346:32922,58347:32941,58348:20880,58349:32940,58350:32987,58351:32997,58352:32985,58353:32989,58354:32964,58355:32986,58356:32982,58357:33033,58358:33007,58359:33009,58360:33051,58361:33065,58362:33059,58363:33071,58364:33099,58432:38539,58433:33094,58434:33086,58435:33107,58436:33105,58437:33020,58438:33137,58439:33134,58440:33125,58441:33126,58442:33140,58443:33155,58444:33160,58445:33162,58446:33152,58447:33154,58448:33184,58449:33173,58450:33188,58451:33187,58452:33119,58453:33171,58454:33193,58455:33200,58456:33205,58457:33214,58458:33208,58459:33213,58460:33216,58461:33218,58462:33210,58463:33225,58464:33229,58465:33233,58466:33241,58467:33240,58468:33224,58469:33242,58470:33247,58471:33248,58472:33255,58473:33274,58474:33275,58475:33278,58476:33281,58477:33282,58478:33285,58479:33287,58480:33290,58481:33293,58482:33296,58483:33302,58484:33321,58485:33323,58486:33336,58487:33331,58488:33344,58489:33369,58490:33368,58491:33373,58492:33370,58493:33375,58494:33380,58496:33378,58497:33384,58498:33386,58499:33387,58500:33326,58501:33393,58502:33399,58503:33400,58504:33406,58505:33421,58506:33426,58507:33451,58508:33439,58509:33467,58510:33452,58511:33505,58512:33507,58513:33503,58514:33490,58515:33524,58516:33523,58517:33530,58518:33683,58519:33539,58520:33531,58521:33529,58522:33502,58523:33542,58524:33500,58525:33545,58526:33497,58527:33589,58528:33588,58529:33558,58530:33586,58531:33585,58532:33600,58533:33593,58534:33616,58535:33605,58536:33583,58537:33579,58538:33559,58539:33560,58540:33669,58541:33690,58542:33706,58543:33695,58544:33698,58545:33686,58546:33571,58547:33678,58548:33671,58549:33674,58550:33660,58551:33717,58552:33651,58553:33653,58554:33696,58555:33673,58556:33704,58557:33780,58558:33811,58559:33771,58560:33742,58561:33789,58562:33795,58563:33752,58564:33803,58565:33729,58566:33783,58567:33799,58568:33760,58569:33778,58570:33805,58571:33826,58572:33824,58573:33725,58574:33848,58575:34054,58576:33787,58577:33901,58578:33834,58579:33852,58580:34138,58581:33924,58582:33911,58583:33899,58584:33965,58585:33902,58586:33922,58587:33897,58588:33862,58589:33836,58590:33903,58591:33913,58592:33845,58593:33994,58594:33890,58595:33977,58596:33983,58597:33951,58598:34009,58599:33997,58600:33979,58601:34010,58602:34e3,58603:33985,58604:33990,58605:34006,58606:33953,58607:34081,58608:34047,58609:34036,58610:34071,58611:34072,58612:34092,58613:34079,58614:34069,58615:34068,58616:34044,58617:34112,58618:34147,58619:34136,58620:34120,58688:34113,58689:34306,58690:34123,58691:34133,58692:34176,58693:34212,58694:34184,58695:34193,58696:34186,58697:34216,58698:34157,58699:34196,58700:34203,58701:34282,58702:34183,58703:34204,58704:34167,58705:34174,58706:34192,58707:34249,58708:34234,58709:34255,58710:34233,58711:34256,58712:34261,58713:34269,58714:34277,58715:34268,58716:34297,58717:34314,58718:34323,58719:34315,58720:34302,58721:34298,58722:34310,58723:34338,58724:34330,58725:34352,58726:34367,58727:34381,58728:20053,58729:34388,58730:34399,58731:34407,58732:34417,58733:34451,58734:34467,58735:34473,58736:34474,58737:34443,58738:34444,58739:34486,58740:34479,58741:34500,58742:34502,58743:34480,58744:34505,58745:34851,58746:34475,58747:34516,58748:34526,58749:34537,58750:34540,58752:34527,58753:34523,58754:34543,58755:34578,58756:34566,58757:34568,58758:34560,58759:34563,58760:34555,58761:34577,58762:34569,58763:34573,58764:34553,58765:34570,58766:34612,58767:34623,58768:34615,58769:34619,58770:34597,58771:34601,58772:34586,58773:34656,58774:34655,58775:34680,58776:34636,58777:34638,58778:34676,58779:34647,58780:34664,58781:34670,58782:34649,58783:34643,58784:34659,58785:34666,58786:34821,58787:34722,58788:34719,58789:34690,58790:34735,58791:34763,58792:34749,58793:34752,58794:34768,58795:38614,58796:34731,58797:34756,58798:34739,58799:34759,58800:34758,58801:34747,58802:34799,58803:34802,58804:34784,58805:34831,58806:34829,58807:34814,58808:34806,58809:34807,58810:34830,58811:34770,58812:34833,58813:34838,58814:34837,58815:34850,58816:34849,58817:34865,58818:34870,58819:34873,58820:34855,58821:34875,58822:34884,58823:34882,58824:34898,58825:34905,58826:34910,58827:34914,58828:34923,58829:34945,58830:34942,58831:34974,58832:34933,58833:34941,58834:34997,58835:34930,58836:34946,58837:34967,58838:34962,58839:34990,58840:34969,58841:34978,58842:34957,58843:34980,58844:34992,58845:35007,58846:34993,58847:35011,58848:35012,58849:35028,58850:35032,58851:35033,58852:35037,58853:35065,58854:35074,58855:35068,58856:35060,58857:35048,58858:35058,58859:35076,58860:35084,58861:35082,58862:35091,58863:35139,58864:35102,58865:35109,58866:35114,58867:35115,58868:35137,58869:35140,58870:35131,58871:35126,58872:35128,58873:35148,58874:35101,58875:35168,58876:35166,58944:35174,58945:35172,58946:35181,58947:35178,58948:35183,58949:35188,58950:35191,58951:35198,58952:35203,58953:35208,58954:35210,58955:35219,58956:35224,58957:35233,58958:35241,58959:35238,58960:35244,58961:35247,58962:35250,58963:35258,58964:35261,58965:35263,58966:35264,58967:35290,58968:35292,58969:35293,58970:35303,58971:35316,58972:35320,58973:35331,58974:35350,58975:35344,58976:35340,58977:35355,58978:35357,58979:35365,58980:35382,58981:35393,58982:35419,58983:35410,58984:35398,58985:35400,58986:35452,58987:35437,58988:35436,58989:35426,58990:35461,58991:35458,58992:35460,58993:35496,58994:35489,58995:35473,58996:35493,58997:35494,58998:35482,58999:35491,59e3:35524,59001:35533,59002:35522,59003:35546,59004:35563,59005:35571,59006:35559,59008:35556,59009:35569,59010:35604,59011:35552,59012:35554,59013:35575,59014:35550,59015:35547,59016:35596,59017:35591,59018:35610,59019:35553,59020:35606,59021:35600,59022:35607,59023:35616,59024:35635,59025:38827,59026:35622,59027:35627,59028:35646,59029:35624,59030:35649,59031:35660,59032:35663,59033:35662,59034:35657,59035:35670,59036:35675,59037:35674,59038:35691,59039:35679,59040:35692,59041:35695,59042:35700,59043:35709,59044:35712,59045:35724,59046:35726,59047:35730,59048:35731,59049:35734,59050:35737,59051:35738,59052:35898,59053:35905,59054:35903,59055:35912,59056:35916,59057:35918,59058:35920,59059:35925,59060:35938,59061:35948,59062:35960,59063:35962,59064:35970,59065:35977,59066:35973,59067:35978,59068:35981,59069:35982,59070:35988,59071:35964,59072:35992,59073:25117,59074:36013,59075:36010,59076:36029,59077:36018,59078:36019,59079:36014,59080:36022,59081:36040,59082:36033,59083:36068,59084:36067,59085:36058,59086:36093,59087:36090,59088:36091,59089:36100,59090:36101,59091:36106,59092:36103,59093:36111,59094:36109,59095:36112,59096:40782,59097:36115,59098:36045,59099:36116,59100:36118,59101:36199,59102:36205,59103:36209,59104:36211,59105:36225,59106:36249,59107:36290,59108:36286,59109:36282,59110:36303,59111:36314,59112:36310,59113:36300,59114:36315,59115:36299,59116:36330,59117:36331,59118:36319,59119:36323,59120:36348,59121:36360,59122:36361,59123:36351,59124:36381,59125:36382,59126:36368,59127:36383,59128:36418,59129:36405,59130:36400,59131:36404,59132:36426,59200:36423,59201:36425,59202:36428,59203:36432,59204:36424,59205:36441,59206:36452,59207:36448,59208:36394,59209:36451,59210:36437,59211:36470,59212:36466,59213:36476,59214:36481,59215:36487,59216:36485,59217:36484,59218:36491,59219:36490,59220:36499,59221:36497,59222:36500,59223:36505,59224:36522,59225:36513,59226:36524,59227:36528,59228:36550,59229:36529,59230:36542,59231:36549,59232:36552,59233:36555,59234:36571,59235:36579,59236:36604,59237:36603,59238:36587,59239:36606,59240:36618,59241:36613,59242:36629,59243:36626,59244:36633,59245:36627,59246:36636,59247:36639,59248:36635,59249:36620,59250:36646,59251:36659,59252:36667,59253:36665,59254:36677,59255:36674,59256:36670,59257:36684,59258:36681,59259:36678,59260:36686,59261:36695,59262:36700,59264:36706,59265:36707,59266:36708,59267:36764,59268:36767,59269:36771,59270:36781,59271:36783,59272:36791,59273:36826,59274:36837,59275:36834,59276:36842,59277:36847,59278:36999,59279:36852,59280:36869,59281:36857,59282:36858,59283:36881,59284:36885,59285:36897,59286:36877,59287:36894,59288:36886,59289:36875,59290:36903,59291:36918,59292:36917,59293:36921,59294:36856,59295:36943,59296:36944,59297:36945,59298:36946,59299:36878,59300:36937,59301:36926,59302:36950,59303:36952,59304:36958,59305:36968,59306:36975,59307:36982,59308:38568,59309:36978,59310:36994,59311:36989,59312:36993,59313:36992,59314:37002,59315:37001,59316:37007,59317:37032,59318:37039,59319:37041,59320:37045,59321:37090,59322:37092,59323:25160,59324:37083,59325:37122,59326:37138,59327:37145,59328:37170,59329:37168,59330:37194,59331:37206,59332:37208,59333:37219,59334:37221,59335:37225,59336:37235,59337:37234,59338:37259,59339:37257,59340:37250,59341:37282,59342:37291,59343:37295,59344:37290,59345:37301,59346:37300,59347:37306,59348:37312,59349:37313,59350:37321,59351:37323,59352:37328,59353:37334,59354:37343,59355:37345,59356:37339,59357:37372,59358:37365,59359:37366,59360:37406,59361:37375,59362:37396,59363:37420,59364:37397,59365:37393,59366:37470,59367:37463,59368:37445,59369:37449,59370:37476,59371:37448,59372:37525,59373:37439,59374:37451,59375:37456,59376:37532,59377:37526,59378:37523,59379:37531,59380:37466,59381:37583,59382:37561,59383:37559,59384:37609,59385:37647,59386:37626,59387:37700,59388:37678,59456:37657,59457:37666,59458:37658,59459:37667,59460:37690,59461:37685,59462:37691,59463:37724,59464:37728,59465:37756,59466:37742,59467:37718,59468:37808,59469:37804,59470:37805,59471:37780,59472:37817,59473:37846,59474:37847,59475:37864,59476:37861,59477:37848,59478:37827,59479:37853,59480:37840,59481:37832,59482:37860,59483:37914,59484:37908,59485:37907,59486:37891,59487:37895,59488:37904,59489:37942,59490:37931,59491:37941,59492:37921,59493:37946,59494:37953,59495:37970,59496:37956,59497:37979,59498:37984,59499:37986,59500:37982,59501:37994,59502:37417,59503:38e3,59504:38005,59505:38007,59506:38013,59507:37978,59508:38012,59509:38014,59510:38017,59511:38015,59512:38274,59513:38279,59514:38282,59515:38292,59516:38294,59517:38296,59518:38297,59520:38304,59521:38312,59522:38311,59523:38317,59524:38332,59525:38331,59526:38329,59527:38334,59528:38346,59529:28662,59530:38339,59531:38349,59532:38348,59533:38357,59534:38356,59535:38358,59536:38364,59537:38369,59538:38373,59539:38370,59540:38433,59541:38440,59542:38446,59543:38447,59544:38466,59545:38476,59546:38479,59547:38475,59548:38519,59549:38492,59550:38494,59551:38493,59552:38495,59553:38502,59554:38514,59555:38508,59556:38541,59557:38552,59558:38549,59559:38551,59560:38570,59561:38567,59562:38577,59563:38578,59564:38576,59565:38580,59566:38582,59567:38584,59568:38585,59569:38606,59570:38603,59571:38601,59572:38605,59573:35149,59574:38620,59575:38669,59576:38613,59577:38649,59578:38660,59579:38662,59580:38664,59581:38675,59582:38670,59583:38673,59584:38671,59585:38678,59586:38681,59587:38692,59588:38698,59589:38704,59590:38713,59591:38717,59592:38718,59593:38724,59594:38726,59595:38728,59596:38722,59597:38729,59598:38748,59599:38752,59600:38756,59601:38758,59602:38760,59603:21202,59604:38763,59605:38769,59606:38777,59607:38789,59608:38780,59609:38785,59610:38778,59611:38790,59612:38795,59613:38799,59614:38800,59615:38812,59616:38824,59617:38822,59618:38819,59619:38835,59620:38836,59621:38851,59622:38854,59623:38856,59624:38859,59625:38876,59626:38893,59627:40783,59628:38898,59629:31455,59630:38902,59631:38901,59632:38927,59633:38924,59634:38968,59635:38948,59636:38945,59637:38967,59638:38973,59639:38982,59640:38991,59641:38987,59642:39019,59643:39023,59644:39024,59712:39025,59713:39028,59714:39027,59715:39082,59716:39087,59717:39089,59718:39094,59719:39108,59720:39107,59721:39110,59722:39145,59723:39147,59724:39171,59725:39177,59726:39186,59727:39188,59728:39192,59729:39201,59730:39197,59731:39198,59732:39204,59733:39200,59734:39212,59735:39214,59736:39229,59737:39230,59738:39234,59739:39241,59740:39237,59741:39248,59742:39243,59743:39249,59744:39250,59745:39244,59746:39253,59747:39319,59748:39320,59749:39333,59750:39341,59751:39342,59752:39356,59753:39391,59754:39387,59755:39389,59756:39384,59757:39377,59758:39405,59759:39406,59760:39409,59761:39410,59762:39419,59763:39416,59764:39425,59765:39439,59766:39429,59767:39394,59768:39449,59769:39467,59770:39479,59771:39493,59772:39490,59773:39488,59774:39491,59776:39486,59777:39509,59778:39501,59779:39515,59780:39511,59781:39519,59782:39522,59783:39525,59784:39524,59785:39529,59786:39531,59787:39530,59788:39597,59789:39600,59790:39612,59791:39616,59792:39631,59793:39633,59794:39635,59795:39636,59796:39646,59797:39647,59798:39650,59799:39651,59800:39654,59801:39663,59802:39659,59803:39662,59804:39668,59805:39665,59806:39671,59807:39675,59808:39686,59809:39704,59810:39706,59811:39711,59812:39714,59813:39715,59814:39717,59815:39719,59816:39720,59817:39721,59818:39722,59819:39726,59820:39727,59821:39730,59822:39748,59823:39747,59824:39759,59825:39757,59826:39758,59827:39761,59828:39768,59829:39796,59830:39827,59831:39811,59832:39825,59833:39830,59834:39831,59835:39839,59836:39840,59837:39848,59838:39860,59839:39872,59840:39882,59841:39865,59842:39878,59843:39887,59844:39889,59845:39890,59846:39907,59847:39906,59848:39908,59849:39892,59850:39905,59851:39994,59852:39922,59853:39921,59854:39920,59855:39957,59856:39956,59857:39945,59858:39955,59859:39948,59860:39942,59861:39944,59862:39954,59863:39946,59864:39940,59865:39982,59866:39963,59867:39973,59868:39972,59869:39969,59870:39984,59871:40007,59872:39986,59873:40006,59874:39998,59875:40026,59876:40032,59877:40039,59878:40054,59879:40056,59880:40167,59881:40172,59882:40176,59883:40201,59884:40200,59885:40171,59886:40195,59887:40198,59888:40234,59889:40230,59890:40367,59891:40227,59892:40223,59893:40260,59894:40213,59895:40210,59896:40257,59897:40255,59898:40254,59899:40262,59900:40264,59968:40285,59969:40286,59970:40292,59971:40273,59972:40272,59973:40281,59974:40306,59975:40329,59976:40327,59977:40363,59978:40303,59979:40314,59980:40346,59981:40356,59982:40361,59983:40370,59984:40388,59985:40385,59986:40379,59987:40376,59988:40378,59989:40390,59990:40399,59991:40386,59992:40409,59993:40403,59994:40440,59995:40422,59996:40429,59997:40431,59998:40445,59999:40474,6e4:40475,60001:40478,60002:40565,60003:40569,60004:40573,60005:40577,60006:40584,60007:40587,60008:40588,60009:40594,60010:40597,60011:40593,60012:40605,60013:40613,60014:40617,60015:40632,60016:40618,60017:40621,60018:38753,60019:40652,60020:40654,60021:40655,60022:40656,60023:40660,60024:40668,60025:40670,60026:40669,60027:40672,60028:40677,60029:40680,60030:40687,60032:40692,60033:40694,60034:40695,60035:40697,60036:40699,60037:40700,60038:40701,60039:40711,60040:40712,60041:30391,60042:40725,60043:40737,60044:40748,60045:40766,60046:40778,60047:40786,60048:40788,60049:40803,60050:40799,60051:40800,60052:40801,60053:40806,60054:40807,60055:40812,60056:40810,60057:40823,60058:40818,60059:40822,60060:40853,60061:40860,60062:40864,60063:22575,60064:27079,60065:36953,60066:29796,60067:20956,60068:29081}},function(e,t,o){Object.defineProperty(t,"__esModule",{value:!0});var r=o(1),i=o(2);t.decode=function(e,t){var o=new Uint8ClampedArray(e.length);o.set(e);for(var s=new r.default(285,256,0),n=new i.default(s,o),a=new Uint8ClampedArray(t),c=!1,l=0;l<t;l++){var d=n.evaluateAt(s.exp(l+s.generatorBase));a[a.length-1-l]=d,0!==d&&(c=!0)}if(!c)return o;var u=new i.default(s,a),h=function(e,t,o,r){var i;t.degree()<o.degree()&&(t=(i=[o,t])[0],o=i[1]);for(var s=t,n=o,a=e.zero,c=e.one;n.degree()>=r/2;){var l=s,d=a;if(a=c,(s=n).isZero())return null;n=l;for(var u=e.zero,h=s.getCoefficient(s.degree()),p=e.inverse(h);n.degree()>=s.degree()&&!n.isZero();){var m=n.degree()-s.degree(),f=e.multiply(n.getCoefficient(n.degree()),p);u=u.addOrSubtract(e.buildMonomial(m,f)),n=n.addOrSubtract(s.multiplyByMonomial(m,f))}if(c=u.multiplyPoly(a).addOrSubtract(d),n.degree()>=s.degree())return null}var g=c.getCoefficient(0);if(0===g)return null;var _=e.inverse(g);return[c.multiply(_),n.multiply(_)]}(s,s.buildMonomial(t,1),u,t);if(null===h)return null;var p=function(e,t){var o=t.degree();if(1===o)return[t.getCoefficient(1)];for(var r=new Array(o),i=0,s=1;s<e.size&&i<o;s++)0===t.evaluateAt(s)&&(r[i]=e.inverse(s),i++);return i!==o?null:r}(s,h[0]);if(null==p)return null;for(var m=function(e,t,o){for(var i=o.length,s=new Array(i),n=0;n<i;n++){for(var a=e.inverse(o[n]),c=1,l=0;l<i;l++)n!==l&&(c=e.multiply(c,r.addOrSubtractGF(1,e.multiply(o[l],a))));s[n]=e.multiply(t.evaluateAt(a),e.inverse(c)),0!==e.generatorBase&&(s[n]=e.multiply(s[n],a))}return s}(s,h[1],p),f=0;f<p.length;f++){var g=o.length-1-s.log(p[f]);if(g<0)return null;o[g]=r.addOrSubtractGF(o[g],m[f])}return o}},function(e,t,o){Object.defineProperty(t,"__esModule",{value:!0}),t.VERSIONS=[{infoBits:null,versionNumber:1,alignmentPatternCenters:[],errorCorrectionLevels:[{ecCodewordsPerBlock:7,ecBlocks:[{numBlocks:1,dataCodewordsPerBlock:19}]},{ecCodewordsPerBlock:10,ecBlocks:[{numBlocks:1,dataCodewordsPerBlock:16}]},{ecCodewordsPerBlock:13,ecBlocks:[{numBlocks:1,dataCodewordsPerBlock:13}]},{ecCodewordsPerBlock:17,ecBlocks:[{numBlocks:1,dataCodewordsPerBlock:9}]}]},{infoBits:null,versionNumber:2,alignmentPatternCenters:[6,18],errorCorrectionLevels:[{ecCodewordsPerBlock:10,ecBlocks:[{numBlocks:1,dataCodewordsPerBlock:34}]},{ecCodewordsPerBlock:16,ecBlocks:[{numBlocks:1,dataCodewordsPerBlock:28}]},{ecCodewordsPerBlock:22,ecBlocks:[{numBlocks:1,dataCodewordsPerBlock:22}]},{ecCodewordsPerBlock:28,ecBlocks:[{numBlocks:1,dataCodewordsPerBlock:16}]}]},{infoBits:null,versionNumber:3,alignmentPatternCenters:[6,22],errorCorrectionLevels:[{ecCodewordsPerBlock:15,ecBlocks:[{numBlocks:1,dataCodewordsPerBlock:55}]},{ecCodewordsPerBlock:26,ecBlocks:[{numBlocks:1,dataCodewordsPerBlock:44}]},{ecCodewordsPerBlock:18,ecBlocks:[{numBlocks:2,dataCodewordsPerBlock:17}]},{ecCodewordsPerBlock:22,ecBlocks:[{numBlocks:2,dataCodewordsPerBlock:13}]}]},{infoBits:null,versionNumber:4,alignmentPatternCenters:[6,26],errorCorrectionLevels:[{ecCodewordsPerBlock:20,ecBlocks:[{numBlocks:1,dataCodewordsPerBlock:80}]},{ecCodewordsPerBlock:18,ecBlocks:[{numBlocks:2,dataCodewordsPerBlock:32}]},{ecCodewordsPerBlock:26,ecBlocks:[{numBlocks:2,dataCodewordsPerBlock:24}]},{ecCodewordsPerBlock:16,ecBlocks:[{numBlocks:4,dataCodewordsPerBlock:9}]}]},{infoBits:null,versionNumber:5,alignmentPatternCenters:[6,30],errorCorrectionLevels:[{ecCodewordsPerBlock:26,ecBlocks:[{numBlocks:1,dataCodewordsPerBlock:108}]},{ecCodewordsPerBlock:24,ecBlocks:[{numBlocks:2,dataCodewordsPerBlock:43}]},{ecCodewordsPerBlock:18,ecBlocks:[{numBlocks:2,dataCodewordsPerBlock:15},{numBlocks:2,dataCodewordsPerBlock:16}]},{ecCodewordsPerBlock:22,ecBlocks:[{numBlocks:2,dataCodewordsPerBlock:11},{numBlocks:2,dataCodewordsPerBlock:12}]}]},{infoBits:null,versionNumber:6,alignmentPatternCenters:[6,34],errorCorrectionLevels:[{ecCodewordsPerBlock:18,ecBlocks:[{numBlocks:2,dataCodewordsPerBlock:68}]},{ecCodewordsPerBlock:16,ecBlocks:[{numBlocks:4,dataCodewordsPerBlock:27}]},{ecCodewordsPerBlock:24,ecBlocks:[{numBlocks:4,dataCodewordsPerBlock:19}]},{ecCodewordsPerBlock:28,ecBlocks:[{numBlocks:4,dataCodewordsPerBlock:15}]}]},{infoBits:31892,versionNumber:7,alignmentPatternCenters:[6,22,38],errorCorrectionLevels:[{ecCodewordsPerBlock:20,ecBlocks:[{numBlocks:2,dataCodewordsPerBlock:78}]},{ecCodewordsPerBlock:18,ecBlocks:[{numBlocks:4,dataCodewordsPerBlock:31}]},{ecCodewordsPerBlock:18,ecBlocks:[{numBlocks:2,dataCodewordsPerBlock:14},{numBlocks:4,dataCodewordsPerBlock:15}]},{ecCodewordsPerBlock:26,ecBlocks:[{numBlocks:4,dataCodewordsPerBlock:13},{numBlocks:1,dataCodewordsPerBlock:14}]}]},{infoBits:34236,versionNumber:8,alignmentPatternCenters:[6,24,42],errorCorrectionLevels:[{ecCodewordsPerBlock:24,ecBlocks:[{numBlocks:2,dataCodewordsPerBlock:97}]},{ecCodewordsPerBlock:22,ecBlocks:[{numBlocks:2,dataCodewordsPerBlock:38},{numBlocks:2,dataCodewordsPerBlock:39}]},{ecCodewordsPerBlock:22,ecBlocks:[{numBlocks:4,dataCodewordsPerBlock:18},{numBlocks:2,dataCodewordsPerBlock:19}]},{ecCodewordsPerBlock:26,ecBlocks:[{numBlocks:4,dataCodewordsPerBlock:14},{numBlocks:2,dataCodewordsPerBlock:15}]}]},{infoBits:39577,versionNumber:9,alignmentPatternCenters:[6,26,46],errorCorrectionLevels:[{ecCodewordsPerBlock:30,ecBlocks:[{numBlocks:2,dataCodewordsPerBlock:116}]},{ecCodewordsPerBlock:22,ecBlocks:[{numBlocks:3,dataCodewordsPerBlock:36},{numBlocks:2,dataCodewordsPerBlock:37}]},{ecCodewordsPerBlock:20,ecBlocks:[{numBlocks:4,dataCodewordsPerBlock:16},{numBlocks:4,dataCodewordsPerBlock:17}]},{ecCodewordsPerBlock:24,ecBlocks:[{numBlocks:4,dataCodewordsPerBlock:12},{numBlocks:4,dataCodewordsPerBlock:13}]}]},{infoBits:42195,versionNumber:10,alignmentPatternCenters:[6,28,50],errorCorrectionLevels:[{ecCodewordsPerBlock:18,ecBlocks:[{numBlocks:2,dataCodewordsPerBlock:68},{numBlocks:2,dataCodewordsPerBlock:69}]},{ecCodewordsPerBlock:26,ecBlocks:[{numBlocks:4,dataCodewordsPerBlock:43},{numBlocks:1,dataCodewordsPerBlock:44}]},{ecCodewordsPerBlock:24,ecBlocks:[{numBlocks:6,dataCodewordsPerBlock:19},{numBlocks:2,dataCodewordsPerBlock:20}]},{ecCodewordsPerBlock:28,ecBlocks:[{numBlocks:6,dataCodewordsPerBlock:15},{numBlocks:2,dataCodewordsPerBlock:16}]}]},{infoBits:48118,versionNumber:11,alignmentPatternCenters:[6,30,54],errorCorrectionLevels:[{ecCodewordsPerBlock:20,ecBlocks:[{numBlocks:4,dataCodewordsPerBlock:81}]},{ecCodewordsPerBlock:30,ecBlocks:[{numBlocks:1,dataCodewordsPerBlock:50},{numBlocks:4,dataCodewordsPerBlock:51}]},{ecCodewordsPerBlock:28,ecBlocks:[{numBlocks:4,dataCodewordsPerBlock:22},{numBlocks:4,dataCodewordsPerBlock:23}]},{ecCodewordsPerBlock:24,ecBlocks:[{numBlocks:3,dataCodewordsPerBlock:12},{numBlocks:8,dataCodewordsPerBlock:13}]}]},{infoBits:51042,versionNumber:12,alignmentPatternCenters:[6,32,58],errorCorrectionLevels:[{ecCodewordsPerBlock:24,ecBlocks:[{numBlocks:2,dataCodewordsPerBlock:92},{numBlocks:2,dataCodewordsPerBlock:93}]},{ecCodewordsPerBlock:22,ecBlocks:[{numBlocks:6,dataCodewordsPerBlock:36},{numBlocks:2,dataCodewordsPerBlock:37}]},{ecCodewordsPerBlock:26,ecBlocks:[{numBlocks:4,dataCodewordsPerBlock:20},{numBlocks:6,dataCodewordsPerBlock:21}]},{ecCodewordsPerBlock:28,ecBlocks:[{numBlocks:7,dataCodewordsPerBlock:14},{numBlocks:4,dataCodewordsPerBlock:15}]}]},{infoBits:55367,versionNumber:13,alignmentPatternCenters:[6,34,62],errorCorrectionLevels:[{ecCodewordsPerBlock:26,ecBlocks:[{numBlocks:4,dataCodewordsPerBlock:107}]},{ecCodewordsPerBlock:22,ecBlocks:[{numBlocks:8,dataCodewordsPerBlock:37},{numBlocks:1,dataCodewordsPerBlock:38}]},{ecCodewordsPerBlock:24,ecBlocks:[{numBlocks:8,dataCodewordsPerBlock:20},{numBlocks:4,dataCodewordsPerBlock:21}]},{ecCodewordsPerBlock:22,ecBlocks:[{numBlocks:12,dataCodewordsPerBlock:11},{numBlocks:4,dataCodewordsPerBlock:12}]}]},{infoBits:58893,versionNumber:14,alignmentPatternCenters:[6,26,46,66],errorCorrectionLevels:[{ecCodewordsPerBlock:30,ecBlocks:[{numBlocks:3,dataCodewordsPerBlock:115},{numBlocks:1,dataCodewordsPerBlock:116}]},{ecCodewordsPerBlock:24,ecBlocks:[{numBlocks:4,dataCodewordsPerBlock:40},{numBlocks:5,dataCodewordsPerBlock:41}]},{ecCodewordsPerBlock:20,ecBlocks:[{numBlocks:11,dataCodewordsPerBlock:16},{numBlocks:5,dataCodewordsPerBlock:17}]},{ecCodewordsPerBlock:24,ecBlocks:[{numBlocks:11,dataCodewordsPerBlock:12},{numBlocks:5,dataCodewordsPerBlock:13}]}]},{infoBits:63784,versionNumber:15,alignmentPatternCenters:[6,26,48,70],errorCorrectionLevels:[{ecCodewordsPerBlock:22,ecBlocks:[{numBlocks:5,dataCodewordsPerBlock:87},{numBlocks:1,dataCodewordsPerBlock:88}]},{ecCodewordsPerBlock:24,ecBlocks:[{numBlocks:5,dataCodewordsPerBlock:41},{numBlocks:5,dataCodewordsPerBlock:42}]},{ecCodewordsPerBlock:30,ecBlocks:[{numBlocks:5,dataCodewordsPerBlock:24},{numBlocks:7,dataCodewordsPerBlock:25}]},{ecCodewordsPerBlock:24,ecBlocks:[{numBlocks:11,dataCodewordsPerBlock:12},{numBlocks:7,dataCodewordsPerBlock:13}]}]},{infoBits:68472,versionNumber:16,alignmentPatternCenters:[6,26,50,74],errorCorrectionLevels:[{ecCodewordsPerBlock:24,ecBlocks:[{numBlocks:5,dataCodewordsPerBlock:98},{numBlocks:1,dataCodewordsPerBlock:99}]},{ecCodewordsPerBlock:28,ecBlocks:[{numBlocks:7,dataCodewordsPerBlock:45},{numBlocks:3,dataCodewordsPerBlock:46}]},{ecCodewordsPerBlock:24,ecBlocks:[{numBlocks:15,dataCodewordsPerBlock:19},{numBlocks:2,dataCodewordsPerBlock:20}]},{ecCodewordsPerBlock:30,ecBlocks:[{numBlocks:3,dataCodewordsPerBlock:15},{numBlocks:13,dataCodewordsPerBlock:16}]}]},{infoBits:70749,versionNumber:17,alignmentPatternCenters:[6,30,54,78],errorCorrectionLevels:[{ecCodewordsPerBlock:28,ecBlocks:[{numBlocks:1,dataCodewordsPerBlock:107},{numBlocks:5,dataCodewordsPerBlock:108}]},{ecCodewordsPerBlock:28,ecBlocks:[{numBlocks:10,dataCodewordsPerBlock:46},{numBlocks:1,dataCodewordsPerBlock:47}]},{ecCodewordsPerBlock:28,ecBlocks:[{numBlocks:1,dataCodewordsPerBlock:22},{numBlocks:15,dataCodewordsPerBlock:23}]},{ecCodewordsPerBlock:28,ecBlocks:[{numBlocks:2,dataCodewordsPerBlock:14},{numBlocks:17,dataCodewordsPerBlock:15}]}]},{infoBits:76311,versionNumber:18,alignmentPatternCenters:[6,30,56,82],errorCorrectionLevels:[{ecCodewordsPerBlock:30,ecBlocks:[{numBlocks:5,dataCodewordsPerBlock:120},{numBlocks:1,dataCodewordsPerBlock:121}]},{ecCodewordsPerBlock:26,ecBlocks:[{numBlocks:9,dataCodewordsPerBlock:43},{numBlocks:4,dataCodewordsPerBlock:44}]},{ecCodewordsPerBlock:28,ecBlocks:[{numBlocks:17,dataCodewordsPerBlock:22},{numBlocks:1,dataCodewordsPerBlock:23}]},{ecCodewordsPerBlock:28,ecBlocks:[{numBlocks:2,dataCodewordsPerBlock:14},{numBlocks:19,dataCodewordsPerBlock:15}]}]},{infoBits:79154,versionNumber:19,alignmentPatternCenters:[6,30,58,86],errorCorrectionLevels:[{ecCodewordsPerBlock:28,ecBlocks:[{numBlocks:3,dataCodewordsPerBlock:113},{numBlocks:4,dataCodewordsPerBlock:114}]},{ecCodewordsPerBlock:26,ecBlocks:[{numBlocks:3,dataCodewordsPerBlock:44},{numBlocks:11,dataCodewordsPerBlock:45}]},{ecCodewordsPerBlock:26,ecBlocks:[{numBlocks:17,dataCodewordsPerBlock:21},{numBlocks:4,dataCodewordsPerBlock:22}]},{ecCodewordsPerBlock:26,ecBlocks:[{numBlocks:9,dataCodewordsPerBlock:13},{numBlocks:16,dataCodewordsPerBlock:14}]}]},{infoBits:84390,versionNumber:20,alignmentPatternCenters:[6,34,62,90],errorCorrectionLevels:[{ecCodewordsPerBlock:28,ecBlocks:[{numBlocks:3,dataCodewordsPerBlock:107},{numBlocks:5,dataCodewordsPerBlock:108}]},{ecCodewordsPerBlock:26,ecBlocks:[{numBlocks:3,dataCodewordsPerBlock:41},{numBlocks:13,dataCodewordsPerBlock:42}]},{ecCodewordsPerBlock:30,ecBlocks:[{numBlocks:15,dataCodewordsPerBlock:24},{numBlocks:5,dataCodewordsPerBlock:25}]},{ecCodewordsPerBlock:28,ecBlocks:[{numBlocks:15,dataCodewordsPerBlock:15},{numBlocks:10,dataCodewordsPerBlock:16}]}]},{infoBits:87683,versionNumber:21,alignmentPatternCenters:[6,28,50,72,94],errorCorrectionLevels:[{ecCodewordsPerBlock:28,ecBlocks:[{numBlocks:4,dataCodewordsPerBlock:116},{numBlocks:4,dataCodewordsPerBlock:117}]},{ecCodewordsPerBlock:26,ecBlocks:[{numBlocks:17,dataCodewordsPerBlock:42}]},{ecCodewordsPerBlock:28,ecBlocks:[{numBlocks:17,dataCodewordsPerBlock:22},{numBlocks:6,dataCodewordsPerBlock:23}]},{ecCodewordsPerBlock:30,ecBlocks:[{numBlocks:19,dataCodewordsPerBlock:16},{numBlocks:6,dataCodewordsPerBlock:17}]}]},{infoBits:92361,versionNumber:22,alignmentPatternCenters:[6,26,50,74,98],errorCorrectionLevels:[{ecCodewordsPerBlock:28,ecBlocks:[{numBlocks:2,dataCodewordsPerBlock:111},{numBlocks:7,dataCodewordsPerBlock:112}]},{ecCodewordsPerBlock:28,ecBlocks:[{numBlocks:17,dataCodewordsPerBlock:46}]},{ecCodewordsPerBlock:30,ecBlocks:[{numBlocks:7,dataCodewordsPerBlock:24},{numBlocks:16,dataCodewordsPerBlock:25}]},{ecCodewordsPerBlock:24,ecBlocks:[{numBlocks:34,dataCodewordsPerBlock:13}]}]},{infoBits:96236,versionNumber:23,alignmentPatternCenters:[6,30,54,74,102],errorCorrectionLevels:[{ecCodewordsPerBlock:30,ecBlocks:[{numBlocks:4,dataCodewordsPerBlock:121},{numBlocks:5,dataCodewordsPerBlock:122}]},{ecCodewordsPerBlock:28,ecBlocks:[{numBlocks:4,dataCodewordsPerBlock:47},{numBlocks:14,dataCodewordsPerBlock:48}]},{ecCodewordsPerBlock:30,ecBlocks:[{numBlocks:11,dataCodewordsPerBlock:24},{numBlocks:14,dataCodewordsPerBlock:25}]},{ecCodewordsPerBlock:30,ecBlocks:[{numBlocks:16,dataCodewordsPerBlock:15},{numBlocks:14,dataCodewordsPerBlock:16}]}]},{infoBits:102084,versionNumber:24,alignmentPatternCenters:[6,28,54,80,106],errorCorrectionLevels:[{ecCodewordsPerBlock:30,ecBlocks:[{numBlocks:6,dataCodewordsPerBlock:117},{numBlocks:4,dataCodewordsPerBlock:118}]},{ecCodewordsPerBlock:28,ecBlocks:[{numBlocks:6,dataCodewordsPerBlock:45},{numBlocks:14,dataCodewordsPerBlock:46}]},{ecCodewordsPerBlock:30,ecBlocks:[{numBlocks:11,dataCodewordsPerBlock:24},{numBlocks:16,dataCodewordsPerBlock:25}]},{ecCodewordsPerBlock:30,ecBlocks:[{numBlocks:30,dataCodewordsPerBlock:16},{numBlocks:2,dataCodewordsPerBlock:17}]}]},{infoBits:102881,versionNumber:25,alignmentPatternCenters:[6,32,58,84,110],errorCorrectionLevels:[{ecCodewordsPerBlock:26,ecBlocks:[{numBlocks:8,dataCodewordsPerBlock:106},{numBlocks:4,dataCodewordsPerBlock:107}]},{ecCodewordsPerBlock:28,ecBlocks:[{numBlocks:8,dataCodewordsPerBlock:47},{numBlocks:13,dataCodewordsPerBlock:48}]},{ecCodewordsPerBlock:30,ecBlocks:[{numBlocks:7,dataCodewordsPerBlock:24},{numBlocks:22,dataCodewordsPerBlock:25}]},{ecCodewordsPerBlock:30,ecBlocks:[{numBlocks:22,dataCodewordsPerBlock:15},{numBlocks:13,dataCodewordsPerBlock:16}]}]},{infoBits:110507,versionNumber:26,alignmentPatternCenters:[6,30,58,86,114],errorCorrectionLevels:[{ecCodewordsPerBlock:28,ecBlocks:[{numBlocks:10,dataCodewordsPerBlock:114},{numBlocks:2,dataCodewordsPerBlock:115}]},{ecCodewordsPerBlock:28,ecBlocks:[{numBlocks:19,dataCodewordsPerBlock:46},{numBlocks:4,dataCodewordsPerBlock:47}]},{ecCodewordsPerBlock:28,ecBlocks:[{numBlocks:28,dataCodewordsPerBlock:22},{numBlocks:6,dataCodewordsPerBlock:23}]},{ecCodewordsPerBlock:30,ecBlocks:[{numBlocks:33,dataCodewordsPerBlock:16},{numBlocks:4,dataCodewordsPerBlock:17}]}]},{infoBits:110734,versionNumber:27,alignmentPatternCenters:[6,34,62,90,118],errorCorrectionLevels:[{ecCodewordsPerBlock:30,ecBlocks:[{numBlocks:8,dataCodewordsPerBlock:122},{numBlocks:4,dataCodewordsPerBlock:123}]},{ecCodewordsPerBlock:28,ecBlocks:[{numBlocks:22,dataCodewordsPerBlock:45},{numBlocks:3,dataCodewordsPerBlock:46}]},{ecCodewordsPerBlock:30,ecBlocks:[{numBlocks:8,dataCodewordsPerBlock:23},{numBlocks:26,dataCodewordsPerBlock:24}]},{ecCodewordsPerBlock:30,ecBlocks:[{numBlocks:12,dataCodewordsPerBlock:15},{numBlocks:28,dataCodewordsPerBlock:16}]}]},{infoBits:117786,versionNumber:28,alignmentPatternCenters:[6,26,50,74,98,122],errorCorrectionLevels:[{ecCodewordsPerBlock:30,ecBlocks:[{numBlocks:3,dataCodewordsPerBlock:117},{numBlocks:10,dataCodewordsPerBlock:118}]},{ecCodewordsPerBlock:28,ecBlocks:[{numBlocks:3,dataCodewordsPerBlock:45},{numBlocks:23,dataCodewordsPerBlock:46}]},{ecCodewordsPerBlock:30,ecBlocks:[{numBlocks:4,dataCodewordsPerBlock:24},{numBlocks:31,dataCodewordsPerBlock:25}]},{ecCodewordsPerBlock:30,ecBlocks:[{numBlocks:11,dataCodewordsPerBlock:15},{numBlocks:31,dataCodewordsPerBlock:16}]}]},{infoBits:119615,versionNumber:29,alignmentPatternCenters:[6,30,54,78,102,126],errorCorrectionLevels:[{ecCodewordsPerBlock:30,ecBlocks:[{numBlocks:7,dataCodewordsPerBlock:116},{numBlocks:7,dataCodewordsPerBlock:117}]},{ecCodewordsPerBlock:28,ecBlocks:[{numBlocks:21,dataCodewordsPerBlock:45},{numBlocks:7,dataCodewordsPerBlock:46}]},{ecCodewordsPerBlock:30,ecBlocks:[{numBlocks:1,dataCodewordsPerBlock:23},{numBlocks:37,dataCodewordsPerBlock:24}]},{ecCodewordsPerBlock:30,ecBlocks:[{numBlocks:19,dataCodewordsPerBlock:15},{numBlocks:26,dataCodewordsPerBlock:16}]}]},{infoBits:126325,versionNumber:30,alignmentPatternCenters:[6,26,52,78,104,130],errorCorrectionLevels:[{ecCodewordsPerBlock:30,ecBlocks:[{numBlocks:5,dataCodewordsPerBlock:115},{numBlocks:10,dataCodewordsPerBlock:116}]},{ecCodewordsPerBlock:28,ecBlocks:[{numBlocks:19,dataCodewordsPerBlock:47},{numBlocks:10,dataCodewordsPerBlock:48}]},{ecCodewordsPerBlock:30,ecBlocks:[{numBlocks:15,dataCodewordsPerBlock:24},{numBlocks:25,dataCodewordsPerBlock:25}]},{ecCodewordsPerBlock:30,ecBlocks:[{numBlocks:23,dataCodewordsPerBlock:15},{numBlocks:25,dataCodewordsPerBlock:16}]}]},{infoBits:127568,versionNumber:31,alignmentPatternCenters:[6,30,56,82,108,134],errorCorrectionLevels:[{ecCodewordsPerBlock:30,ecBlocks:[{numBlocks:13,dataCodewordsPerBlock:115},{numBlocks:3,dataCodewordsPerBlock:116}]},{ecCodewordsPerBlock:28,ecBlocks:[{numBlocks:2,dataCodewordsPerBlock:46},{numBlocks:29,dataCodewordsPerBlock:47}]},{ecCodewordsPerBlock:30,ecBlocks:[{numBlocks:42,dataCodewordsPerBlock:24},{numBlocks:1,dataCodewordsPerBlock:25}]},{ecCodewordsPerBlock:30,ecBlocks:[{numBlocks:23,dataCodewordsPerBlock:15},{numBlocks:28,dataCodewordsPerBlock:16}]}]},{infoBits:133589,versionNumber:32,alignmentPatternCenters:[6,34,60,86,112,138],errorCorrectionLevels:[{ecCodewordsPerBlock:30,ecBlocks:[{numBlocks:17,dataCodewordsPerBlock:115}]},{ecCodewordsPerBlock:28,ecBlocks:[{numBlocks:10,dataCodewordsPerBlock:46},{numBlocks:23,dataCodewordsPerBlock:47}]},{ecCodewordsPerBlock:30,ecBlocks:[{numBlocks:10,dataCodewordsPerBlock:24},{numBlocks:35,dataCodewordsPerBlock:25}]},{ecCodewordsPerBlock:30,ecBlocks:[{numBlocks:19,dataCodewordsPerBlock:15},{numBlocks:35,dataCodewordsPerBlock:16}]}]},{infoBits:136944,versionNumber:33,alignmentPatternCenters:[6,30,58,86,114,142],errorCorrectionLevels:[{ecCodewordsPerBlock:30,ecBlocks:[{numBlocks:17,dataCodewordsPerBlock:115},{numBlocks:1,dataCodewordsPerBlock:116}]},{ecCodewordsPerBlock:28,ecBlocks:[{numBlocks:14,dataCodewordsPerBlock:46},{numBlocks:21,dataCodewordsPerBlock:47}]},{ecCodewordsPerBlock:30,ecBlocks:[{numBlocks:29,dataCodewordsPerBlock:24},{numBlocks:19,dataCodewordsPerBlock:25}]},{ecCodewordsPerBlock:30,ecBlocks:[{numBlocks:11,dataCodewordsPerBlock:15},{numBlocks:46,dataCodewordsPerBlock:16}]}]},{infoBits:141498,versionNumber:34,alignmentPatternCenters:[6,34,62,90,118,146],errorCorrectionLevels:[{ecCodewordsPerBlock:30,ecBlocks:[{numBlocks:13,dataCodewordsPerBlock:115},{numBlocks:6,dataCodewordsPerBlock:116}]},{ecCodewordsPerBlock:28,ecBlocks:[{numBlocks:14,dataCodewordsPerBlock:46},{numBlocks:23,dataCodewordsPerBlock:47}]},{ecCodewordsPerBlock:30,ecBlocks:[{numBlocks:44,dataCodewordsPerBlock:24},{numBlocks:7,dataCodewordsPerBlock:25}]},{ecCodewordsPerBlock:30,ecBlocks:[{numBlocks:59,dataCodewordsPerBlock:16},{numBlocks:1,dataCodewordsPerBlock:17}]}]},{infoBits:145311,versionNumber:35,alignmentPatternCenters:[6,30,54,78,102,126,150],errorCorrectionLevels:[{ecCodewordsPerBlock:30,ecBlocks:[{numBlocks:12,dataCodewordsPerBlock:121},{numBlocks:7,dataCodewordsPerBlock:122}]},{ecCodewordsPerBlock:28,ecBlocks:[{numBlocks:12,dataCodewordsPerBlock:47},{numBlocks:26,dataCodewordsPerBlock:48}]},{ecCodewordsPerBlock:30,ecBlocks:[{numBlocks:39,dataCodewordsPerBlock:24},{numBlocks:14,dataCodewordsPerBlock:25}]},{ecCodewordsPerBlock:30,ecBlocks:[{numBlocks:22,dataCodewordsPerBlock:15},{numBlocks:41,dataCodewordsPerBlock:16}]}]},{infoBits:150283,versionNumber:36,alignmentPatternCenters:[6,24,50,76,102,128,154],errorCorrectionLevels:[{ecCodewordsPerBlock:30,ecBlocks:[{numBlocks:6,dataCodewordsPerBlock:121},{numBlocks:14,dataCodewordsPerBlock:122}]},{ecCodewordsPerBlock:28,ecBlocks:[{numBlocks:6,dataCodewordsPerBlock:47},{numBlocks:34,dataCodewordsPerBlock:48}]},{ecCodewordsPerBlock:30,ecBlocks:[{numBlocks:46,dataCodewordsPerBlock:24},{numBlocks:10,dataCodewordsPerBlock:25}]},{ecCodewordsPerBlock:30,ecBlocks:[{numBlocks:2,dataCodewordsPerBlock:15},{numBlocks:64,dataCodewordsPerBlock:16}]}]},{infoBits:152622,versionNumber:37,alignmentPatternCenters:[6,28,54,80,106,132,158],errorCorrectionLevels:[{ecCodewordsPerBlock:30,ecBlocks:[{numBlocks:17,dataCodewordsPerBlock:122},{numBlocks:4,dataCodewordsPerBlock:123}]},{ecCodewordsPerBlock:28,ecBlocks:[{numBlocks:29,dataCodewordsPerBlock:46},{numBlocks:14,dataCodewordsPerBlock:47}]},{ecCodewordsPerBlock:30,ecBlocks:[{numBlocks:49,dataCodewordsPerBlock:24},{numBlocks:10,dataCodewordsPerBlock:25}]},{ecCodewordsPerBlock:30,ecBlocks:[{numBlocks:24,dataCodewordsPerBlock:15},{numBlocks:46,dataCodewordsPerBlock:16}]}]},{infoBits:158308,versionNumber:38,alignmentPatternCenters:[6,32,58,84,110,136,162],errorCorrectionLevels:[{ecCodewordsPerBlock:30,ecBlocks:[{numBlocks:4,dataCodewordsPerBlock:122},{numBlocks:18,dataCodewordsPerBlock:123}]},{ecCodewordsPerBlock:28,ecBlocks:[{numBlocks:13,dataCodewordsPerBlock:46},{numBlocks:32,dataCodewordsPerBlock:47}]},{ecCodewordsPerBlock:30,ecBlocks:[{numBlocks:48,dataCodewordsPerBlock:24},{numBlocks:14,dataCodewordsPerBlock:25}]},{ecCodewordsPerBlock:30,ecBlocks:[{numBlocks:42,dataCodewordsPerBlock:15},{numBlocks:32,dataCodewordsPerBlock:16}]}]},{infoBits:161089,versionNumber:39,alignmentPatternCenters:[6,26,54,82,110,138,166],errorCorrectionLevels:[{ecCodewordsPerBlock:30,ecBlocks:[{numBlocks:20,dataCodewordsPerBlock:117},{numBlocks:4,dataCodewordsPerBlock:118}]},{ecCodewordsPerBlock:28,ecBlocks:[{numBlocks:40,dataCodewordsPerBlock:47},{numBlocks:7,dataCodewordsPerBlock:48}]},{ecCodewordsPerBlock:30,ecBlocks:[{numBlocks:43,dataCodewordsPerBlock:24},{numBlocks:22,dataCodewordsPerBlock:25}]},{ecCodewordsPerBlock:30,ecBlocks:[{numBlocks:10,dataCodewordsPerBlock:15},{numBlocks:67,dataCodewordsPerBlock:16}]}]},{infoBits:167017,versionNumber:40,alignmentPatternCenters:[6,30,58,86,114,142,170],errorCorrectionLevels:[{ecCodewordsPerBlock:30,ecBlocks:[{numBlocks:19,dataCodewordsPerBlock:118},{numBlocks:6,dataCodewordsPerBlock:119}]},{ecCodewordsPerBlock:28,ecBlocks:[{numBlocks:18,dataCodewordsPerBlock:47},{numBlocks:31,dataCodewordsPerBlock:48}]},{ecCodewordsPerBlock:30,ecBlocks:[{numBlocks:34,dataCodewordsPerBlock:24},{numBlocks:34,dataCodewordsPerBlock:25}]},{ecCodewordsPerBlock:30,ecBlocks:[{numBlocks:20,dataCodewordsPerBlock:15},{numBlocks:61,dataCodewordsPerBlock:16}]}]}]},function(e,t,o){Object.defineProperty(t,"__esModule",{value:!0});var r=o(0);function i(e,t,o,r){var i=e.x-t.x+o.x-r.x,s=e.y-t.y+o.y-r.y;if(0===i&&0===s)return{a11:t.x-e.x,a12:t.y-e.y,a13:0,a21:o.x-t.x,a22:o.y-t.y,a23:0,a31:e.x,a32:e.y,a33:1};var n=t.x-o.x,a=r.x-o.x,c=t.y-o.y,l=r.y-o.y,d=n*l-a*c,u=(i*l-a*s)/d,h=(n*s-i*c)/d;return{a11:t.x-e.x+u*t.x,a12:t.y-e.y+u*t.y,a13:u,a21:r.x-e.x+h*r.x,a22:r.y-e.y+h*r.y,a23:h,a31:e.x,a32:e.y,a33:1}}t.extract=function(e,t){for(var o=function(e,t,o,r){var s=i(e,t,o,r);return{a11:s.a22*s.a33-s.a23*s.a32,a12:s.a13*s.a32-s.a12*s.a33,a13:s.a12*s.a23-s.a13*s.a22,a21:s.a23*s.a31-s.a21*s.a33,a22:s.a11*s.a33-s.a13*s.a31,a23:s.a13*s.a21-s.a11*s.a23,a31:s.a21*s.a32-s.a22*s.a31,a32:s.a12*s.a31-s.a11*s.a32,a33:s.a11*s.a22-s.a12*s.a21}}({x:3.5,y:3.5},{x:t.dimension-3.5,y:3.5},{x:t.dimension-6.5,y:t.dimension-6.5},{x:3.5,y:t.dimension-3.5}),s=function(e,t){return{a11:e.a11*t.a11+e.a21*t.a12+e.a31*t.a13,a12:e.a12*t.a11+e.a22*t.a12+e.a32*t.a13,a13:e.a13*t.a11+e.a23*t.a12+e.a33*t.a13,a21:e.a11*t.a21+e.a21*t.a22+e.a31*t.a23,a22:e.a12*t.a21+e.a22*t.a22+e.a32*t.a23,a23:e.a13*t.a21+e.a23*t.a22+e.a33*t.a23,a31:e.a11*t.a31+e.a21*t.a32+e.a31*t.a33,a32:e.a12*t.a31+e.a22*t.a32+e.a32*t.a33,a33:e.a13*t.a31+e.a23*t.a32+e.a33*t.a33}}(i(t.topLeft,t.topRight,t.alignmentPattern,t.bottomLeft),o),n=r.BitMatrix.createEmpty(t.dimension,t.dimension),a=function(e,t){var o=s.a13*e+s.a23*t+s.a33;return{x:(s.a11*e+s.a21*t+s.a31)/o,y:(s.a12*e+s.a22*t+s.a32)/o}},c=0;c<t.dimension;c++)for(var l=0;l<t.dimension;l++){var d=a(l+.5,c+.5);n.set(l,c,e.get(Math.floor(d.x),Math.floor(d.y)))}return{matrix:n,mappingFunction:a}}},function(e,t,o){Object.defineProperty(t,"__esModule",{value:!0});var r=function(e,t){return Math.sqrt(Math.pow(t.x-e.x,2)+Math.pow(t.y-e.y,2))};function i(e){return e.reduce(function(e,t){return e+t})}function s(e,t,o,i){var s,n,a,c,l=[{x:Math.floor(e.x),y:Math.floor(e.y)}],d=Math.abs(t.y-e.y)>Math.abs(t.x-e.x);d?(s=Math.floor(e.y),n=Math.floor(e.x),a=Math.floor(t.y),c=Math.floor(t.x)):(s=Math.floor(e.x),n=Math.floor(e.y),a=Math.floor(t.x),c=Math.floor(t.y));for(var u=Math.abs(a-s),h=Math.abs(c-n),p=Math.floor(-u/2),m=s<a?1:-1,f=n<c?1:-1,g=!0,_=s,v=n;_!==a+m;_+=m){var k=d?v:_,w=d?_:v;if(o.get(k,w)!==g&&(g=!g,l.push({x:k,y:w}),l.length===i+1))break;if((p+=h)>0){if(v===c)break;v+=f,p-=u}}for(var b=[],y=0;y<i;y++)l[y]&&l[y+1]?b.push(r(l[y],l[y+1])):b.push(0);return b}function n(e,t,o,r){var i,n=t.y-e.y,a=t.x-e.x,c=s(e,t,o,Math.ceil(r/2)),l=s(e,{x:e.x-a,y:e.y-n},o,Math.ceil(r/2)),d=c.shift()+l.shift()-1;return(i=l.concat(d)).concat.apply(i,c)}function a(e,t){var o=i(e)/i(t),r=0;return t.forEach(function(t,i){r+=Math.pow(e[i]-t*o,2)}),{averageSize:o,error:r}}function c(e,t,o){try{var r=n(e,{x:-1,y:e.y},o,t.length),i=n(e,{x:e.x,y:-1},o,t.length),s=n(e,{x:Math.max(0,e.x-e.y)-1,y:Math.max(0,e.y-e.x)-1},o,t.length),c=n(e,{x:Math.min(o.width,e.x+e.y)+1,y:Math.min(o.height,e.y+e.x)+1},o,t.length),l=a(r,t),d=a(i,t),u=a(s,t),h=a(c,t),p=Math.sqrt(l.error*l.error+d.error*d.error+u.error*u.error+h.error*h.error),m=(l.averageSize+d.averageSize+u.averageSize+h.averageSize)/4;return p+(Math.pow(l.averageSize-m,2)+Math.pow(d.averageSize-m,2)+Math.pow(u.averageSize-m,2)+Math.pow(h.averageSize-m,2))/m}catch(e){return 1/0}}function l(e,t){for(var o=Math.round(t.x);e.get(o,Math.round(t.y));)o--;for(var r=Math.round(t.x);e.get(r,Math.round(t.y));)r++;for(var i=(o+r)/2,s=Math.round(t.y);e.get(Math.round(i),s);)s--;for(var n=Math.round(t.y);e.get(Math.round(i),n);)n++;return{x:i,y:(s+n)/2}}function d(e,t,o,s,a){var l,d,u;try{l=function(e,t,o,s){var a=(i(n(e,o,s,5))/7+i(n(e,t,s,5))/7+i(n(o,e,s,5))/7+i(n(t,e,s,5))/7)/4;if(a<1)throw new Error("Invalid module size");var c=Math.round(r(e,t)/a),l=Math.round(r(e,o)/a),d=Math.floor((c+l)/2)+7;switch(d%4){case 0:d++;break;case 2:d--}return{dimension:d,moduleSize:a}}(s,o,a,e),d=l.dimension,u=l.moduleSize}catch(e){return null}var h=o.x-s.x+a.x,p=o.y-s.y+a.y,m=(r(s,a)+r(s,o))/2/u,f=1-3/m,g={x:s.x+f*(h-s.x),y:s.y+f*(p-s.y)},_=t.map(function(t){var o=(t.top.startX+t.top.endX+t.bottom.startX+t.bottom.endX)/4,s=(t.top.y+t.bottom.y+1)/2;if(e.get(Math.floor(o),Math.floor(s))){var n=[t.top.endX-t.top.startX,t.bottom.endX-t.bottom.startX,t.bottom.y-t.top.y+1];return i(n),{x:o,y:s,score:c({x:Math.floor(o),y:Math.floor(s)},[1,1,1],e)+r({x:o,y:s},g)}}}).filter(function(e){return!!e}).sort(function(e,t){return e.score-t.score});return{alignmentPattern:m>=15&&_.length?_[0]:g,dimension:d}}t.locate=function(e){for(var t=[],o=[],s=[],n=[],a=function(r){for(var a=0,c=!1,l=[0,0,0,0,0],d=function(t){var s=e.get(t,r);if(s===c)a++;else{l=[l[1],l[2],l[3],l[4],a],a=1,c=s;var d=i(l)/7,u=Math.abs(l[0]-d)<d&&Math.abs(l[1]-d)<d&&Math.abs(l[2]-3*d)<3*d&&Math.abs(l[3]-d)<d&&Math.abs(l[4]-d)<d&&!s,h=i(l.slice(-3))/3,p=Math.abs(l[2]-h)<h&&Math.abs(l[3]-h)<h&&Math.abs(l[4]-h)<h&&s;if(u){var m=t-l[3]-l[4],f=m-l[2],g={startX:f,endX:m,y:r};(_=o.filter(function(e){return f>=e.bottom.startX&&f<=e.bottom.endX||m>=e.bottom.startX&&f<=e.bottom.endX||f<=e.bottom.startX&&m>=e.bottom.endX&&l[2]/(e.bottom.endX-e.bottom.startX)<1.5&&l[2]/(e.bottom.endX-e.bottom.startX)>.5})).length>0?_[0].bottom=g:o.push({top:g,bottom:g})}if(p){var _,v=t-l[4],k=v-l[3];g={startX:k,y:r,endX:v},(_=n.filter(function(e){return k>=e.bottom.startX&&k<=e.bottom.endX||v>=e.bottom.startX&&k<=e.bottom.endX||k<=e.bottom.startX&&v>=e.bottom.endX&&l[2]/(e.bottom.endX-e.bottom.startX)<1.5&&l[2]/(e.bottom.endX-e.bottom.startX)>.5})).length>0?_[0].bottom=g:n.push({top:g,bottom:g})}}},u=-1;u<=e.width;u++)d(u);t.push.apply(t,o.filter(function(e){return e.bottom.y!==r&&e.bottom.y-e.top.y>=2})),o=o.filter(function(e){return e.bottom.y===r}),s.push.apply(s,n.filter(function(e){return e.bottom.y!==r})),n=n.filter(function(e){return e.bottom.y===r})},u=0;u<=e.height;u++)a(u);t.push.apply(t,o.filter(function(e){return e.bottom.y-e.top.y>=2})),s.push.apply(s,n);var h=t.filter(function(e){return e.bottom.y-e.top.y>=2}).map(function(t){var o=(t.top.startX+t.top.endX+t.bottom.startX+t.bottom.endX)/4,r=(t.top.y+t.bottom.y+1)/2;if(e.get(Math.round(o),Math.round(r))){var s=[t.top.endX-t.top.startX,t.bottom.endX-t.bottom.startX,t.bottom.y-t.top.y+1],n=i(s)/s.length;return{score:c({x:Math.round(o),y:Math.round(r)},[1,1,3,1,1],e),x:o,y:r,size:n}}}).filter(function(e){return!!e}).sort(function(e,t){return e.score-t.score}).map(function(e,t,o){if(t>4)return null;var r=o.filter(function(e,o){return t!==o}).map(function(t){return{x:t.x,y:t.y,score:t.score+Math.pow(t.size-e.size,2)/e.size,size:t.size}}).sort(function(e,t){return e.score-t.score});if(r.length<2)return null;var i=e.score+r[0].score+r[1].score;return{points:[e].concat(r.slice(0,2)),score:i}}).filter(function(e){return!!e}).sort(function(e,t){return e.score-t.score});if(0===h.length)return null;var p=function(e,t,o){var i,s,n,a,c,l,d,u=r(e,t),h=r(t,o),p=r(e,o);return h>=u&&h>=p?(c=(i=[t,e,o])[0],l=i[1],d=i[2]):p>=h&&p>=u?(c=(s=[e,t,o])[0],l=s[1],d=s[2]):(c=(n=[e,o,t])[0],l=n[1],d=n[2]),(d.x-l.x)*(c.y-l.y)-(d.y-l.y)*(c.x-l.x)<0&&(c=(a=[d,c])[0],d=a[1]),{bottomLeft:c,topLeft:l,topRight:d}}(h[0].points[0],h[0].points[1],h[0].points[2]),m=p.topRight,f=p.topLeft,g=p.bottomLeft,_=d(e,s,m,f,g),v=[];_&&v.push({alignmentPattern:{x:_.alignmentPattern.x,y:_.alignmentPattern.y},bottomLeft:{x:g.x,y:g.y},dimension:_.dimension,topLeft:{x:f.x,y:f.y},topRight:{x:m.x,y:m.y}});var k=l(e,m),w=l(e,f),b=l(e,g),y=d(e,s,k,w,b);return y&&v.push({alignmentPattern:{x:y.alignmentPattern.x,y:y.alignmentPattern.y},bottomLeft:{x:b.x,y:b.y},topLeft:{x:w.x,y:w.y},topRight:{x:k.x,y:k.y},dimension:y.dimension}),0===v.length?null:v}}]).default},Ie.exports=Ne()),De=Te(Oe);const Re=function(e,t){let o=e;const r=qe[t];let i=null,s=0,n=null;const a=[],c={},l=function(e,t){s=4*o+17,i=function(e){const t=new Array(e);for(let o=0;o<e;o+=1){t[o]=new Array(e);for(let r=0;r<e;r+=1)t[o][r]=null}return t}(s),d(0,0),d(s-7,0),d(0,s-7),h(),u(),m(e,t),o>=7&&p(e),null==n&&(n=g(o,r,a)),f(n,t)},d=function(e,t){for(let o=-1;o<=7;o+=1)if(!(e+o<=-1||s<=e+o))for(let r=-1;r<=7;r+=1)t+r<=-1||s<=t+r||(i[e+o][t+r]=0<=o&&o<=6&&(0==r||6==r)||0<=r&&r<=6&&(0==o||6==o)||2<=o&&o<=4&&2<=r&&r<=4)},u=function(){for(let e=8;e<s-8;e+=1)null==i[e][6]&&(i[e][6]=e%2==0);for(let e=8;e<s-8;e+=1)null==i[6][e]&&(i[6][e]=e%2==0)},h=function(){const e=Je.getPatternPosition(o);for(let t=0;t<e.length;t+=1)for(let o=0;o<e.length;o+=1){const r=e[t],s=e[o];if(null==i[r][s])for(let e=-2;e<=2;e+=1)for(let t=-2;t<=2;t+=1)i[r+e][s+t]=-2==e||2==e||-2==t||2==t||0==e&&0==t}},p=function(e){const t=Je.getBCHTypeNumber(o);for(let o=0;o<18;o+=1){const r=!e&&1==(t>>o&1);i[Math.floor(o/3)][o%3+s-8-3]=r}for(let o=0;o<18;o+=1){const r=!e&&1==(t>>o&1);i[o%3+s-8-3][Math.floor(o/3)]=r}},m=function(e,t){const o=r<<3|t,n=Je.getBCHTypeInfo(o);for(let t=0;t<15;t+=1){const o=!e&&1==(n>>t&1);t<6?i[t][8]=o:t<8?i[t+1][8]=o:i[s-15+t][8]=o}for(let t=0;t<15;t+=1){const o=!e&&1==(n>>t&1);t<8?i[8][s-t-1]=o:t<9?i[8][15-t-1+1]=o:i[8][15-t-1]=o}i[s-8][8]=!e},f=function(e,t){let o=-1,r=s-1,n=7,a=0;const c=Je.getMaskFunction(t);for(let t=s-1;t>0;t-=2)for(6==t&&(t-=1);;){for(let o=0;o<2;o+=1)if(null==i[r][t-o]){let s=!1;a<e.length&&(s=1==(e[a]>>>n&1));c(r,t-o)&&(s=!s),i[r][t-o]=s,n-=1,-1==n&&(a+=1,n=7)}if(r+=o,r<0||s<=r){r-=o,o=-o;break}}},g=function(e,t,o){const r=ot.getRSBlocks(e,t),i=rt();for(let t=0;t<o.length;t+=1){const r=o[t];i.put(r.getMode(),4),i.put(r.getLength(),Je.getLengthInBits(r.getMode(),e)),r.write(i)}let s=0;for(let e=0;e<r.length;e+=1)s+=r[e].dataCount;if(i.getLengthInBits()>8*s)throw"code length overflow. ("+i.getLengthInBits()+">"+8*s+")";for(i.getLengthInBits()+4<=8*s&&i.put(0,4);i.getLengthInBits()%8!=0;)i.putBit(!1);for(;!(i.getLengthInBits()>=8*s||(i.put(236,8),i.getLengthInBits()>=8*s));)i.put(17,8);return function(e,t){let o=0,r=0,i=0;const s=new Array(t.length),n=new Array(t.length);for(let a=0;a<t.length;a+=1){const c=t[a].dataCount,l=t[a].totalCount-c;r=Math.max(r,c),i=Math.max(i,l),s[a]=new Array(c);for(let t=0;t<s[a].length;t+=1)s[a][t]=255&e.getBuffer()[t+o];o+=c;const d=Je.getErrorCorrectPolynomial(l),u=tt(s[a],d.getLength()-1).mod(d);n[a]=new Array(d.getLength()-1);for(let e=0;e<n[a].length;e+=1){const t=e+u.getLength()-n[a].length;n[a][e]=t>=0?u.getAt(t):0}}let a=0;for(let e=0;e<t.length;e+=1)a+=t[e].totalCount;const c=new Array(a);let l=0;for(let e=0;e<r;e+=1)for(let o=0;o<t.length;o+=1)e<s[o].length&&(c[l]=s[o][e],l+=1);for(let e=0;e<i;e+=1)for(let o=0;o<t.length;o+=1)e<n[o].length&&(c[l]=n[o][e],l+=1);return c}(i,r)};c.addData=function(e,t){let o=null;switch(t=t||"Byte"){case"Numeric":o=it(e);break;case"Alphanumeric":o=st(e);break;case"Byte":o=nt(e);break;case"Kanji":o=at(e);break;default:throw"mode:"+t}a.push(o),n=null},c.isDark=function(e,t){if(e<0||s<=e||t<0||s<=t)throw e+","+t;return i[e][t]},c.getModuleCount=function(){return s},c.make=function(){if(o<1){let e=1;for(;e<40;e++){const t=ot.getRSBlocks(e,r),o=rt();for(let t=0;t<a.length;t++){const r=a[t];o.put(r.getMode(),4),o.put(r.getLength(),Je.getLengthInBits(r.getMode(),e)),r.write(o)}let i=0;for(let e=0;e<t.length;e++)i+=t[e].dataCount;if(o.getLengthInBits()<=8*i)break}o=e}l(!1,function(){let e=0,t=0;for(let o=0;o<8;o+=1){l(!0,o);const r=Je.getLostPoint(c);(0==o||e>r)&&(e=r,t=o)}return t}())},c.createTableTag=function(e,t){e=e||2;let o="";o+='<table style="',o+=" border-width: 0px; border-style: none;",o+=" border-collapse: collapse;",o+=" padding: 0px; margin: "+(t=void 0===t?4*e:t)+"px;",o+='">',o+="<tbody>";for(let t=0;t<c.getModuleCount();t+=1){o+="<tr>";for(let r=0;r<c.getModuleCount();r+=1)o+='<td style="',o+=" border-width: 0px; border-style: none;",o+=" border-collapse: collapse;",o+=" padding: 0px; margin: 0px;",o+=" width: "+e+"px;",o+=" height: "+e+"px;",o+=" background-color: ",o+=c.isDark(t,r)?"#000000":"#ffffff",o+=";",o+='"/>';o+="</tr>"}return o+="</tbody>",o+="</table>",o},c.createSvgTag=function(e,t,o,r){let i={};"object"==typeof arguments[0]&&(i=arguments[0],e=i.cellSize,t=i.margin,o=i.alt,r=i.title),e=e||2,t=void 0===t?4*e:t,(o="string"==typeof o?{text:o}:o||{}).text=o.text||null,o.id=o.text?o.id||"qrcode-description":null,(r="string"==typeof r?{text:r}:r||{}).text=r.text||null,r.id=r.text?r.id||"qrcode-title":null;const s=c.getModuleCount()*e+2*t;let n,a,l,d,u,h="";for(u="l"+e+",0 0,"+e+" -"+e+",0 0,-"+e+"z ",h+='<svg version="1.1" xmlns="http://www.w3.org/2000/svg"',h+=i.scalable?"":' width="'+s+'px" height="'+s+'px"',h+=' viewBox="0 0 '+s+" "+s+'" ',h+=' preserveAspectRatio="xMinYMin meet"',h+=r.text||o.text?' role="img" aria-labelledby="'+_([r.id,o.id].join(" ").trim())+'"':"",h+=">",h+=r.text?'<title id="'+_(r.id)+'">'+_(r.text)+"</title>":"",h+=o.text?'<description id="'+_(o.id)+'">'+_(o.text)+"</description>":"",h+='<rect width="100%" height="100%" fill="white" cx="0" cy="0"/>',h+='<path d="',l=0;l<c.getModuleCount();l+=1)for(d=l*e+t,n=0;n<c.getModuleCount();n+=1)c.isDark(l,n)&&(a=n*e+t,h+="M"+a+","+d+u);return h+='" stroke="transparent" fill="black"/>',h+="</svg>",h},c.createDataURL=function(e,t){e=e||2,t=void 0===t?4*e:t;const o=c.getModuleCount()*e+2*t,r=t,i=o-t;return dt(o,o,function(t,o){if(r<=t&&t<i&&r<=o&&o<i){const i=Math.floor((t-r)/e),s=Math.floor((o-r)/e);return c.isDark(s,i)?0:1}return 1})},c.createImgTag=function(e,t,o){e=e||2,t=void 0===t?4*e:t;const r=c.getModuleCount()*e+2*t;let i="";return i+="<img",i+=' src="',i+=c.createDataURL(e,t),i+='"',i+=' width="',i+=r,i+='"',i+=' height="',i+=r,i+='"',o&&(i+=' alt="',i+=_(o),i+='"'),i+="/>",i};const _=function(e){let t="";for(let o=0;o<e.length;o+=1){const r=e.charAt(o);switch(r){case"<":t+="&lt;";break;case">":t+="&gt;";break;case"&":t+="&amp;";break;case'"':t+="&quot;";break;default:t+=r}}return t};return c.createASCII=function(e,t){if((e=e||1)<2)return function(e){e=void 0===e?2:e;const t=1*c.getModuleCount()+2*e,o=e,r=t-e;let i,s,n,a,l;const d={"██":"█","█ ":"▀"," █":"▄","  ":" "},u={"██":"▀","█ ":"▀"," █":" ","  ":" "};let h="";for(i=0;i<t;i+=2){for(n=Math.floor((i-o)/1),a=Math.floor((i+1-o)/1),s=0;s<t;s+=1)l="█",o<=s&&s<r&&o<=i&&i<r&&c.isDark(n,Math.floor((s-o)/1))&&(l=" "),o<=s&&s<r&&o<=i+1&&i+1<r&&c.isDark(a,Math.floor((s-o)/1))?l+=" ":l+="█",h+=e<1&&i+1>=r?u[l]:d[l];h+="\n"}return t%2&&e>0?h.substring(0,h.length-t-1)+Array(t+1).join("▀"):h.substring(0,h.length-1)}(t);e-=1,t=void 0===t?2*e:t;const o=c.getModuleCount()*e+2*t,r=t,i=o-t;let s,n,a,l;const d=Array(e+1).join("██"),u=Array(e+1).join("  ");let h="",p="";for(s=0;s<o;s+=1){for(a=Math.floor((s-r)/e),p="",n=0;n<o;n+=1)l=1,r<=n&&n<i&&r<=s&&s<i&&c.isDark(a,Math.floor((n-r)/e))&&(l=0),p+=l?d:u;for(a=0;a<e;a+=1)h+=p+"\n"}return h.substring(0,h.length-1)},c.renderTo2dContext=function(e,t){t=t||2;const o=c.getModuleCount();for(let r=0;r<o;r++)for(let i=0;i<o;i++)e.fillStyle=c.isDark(r,i)?"black":"white",e.fillRect(i*t,r*t,t,t)},c};Re.stringToBytes=function(e){const t=[];for(let o=0;o<e.length;o+=1){const r=e.charCodeAt(o);t.push(255&r)}return t},Re.createStringToBytes=function(e,t){const o=function(){const o=lt(e),r=function(){const e=o.read();if(-1==e)throw"eof";return e};let i=0;const s={};for(;;){const e=o.read();if(-1==e)break;const t=r(),n=r()<<8|r();s[String.fromCharCode(e<<8|t)]=n,i+=1}if(i!=t)throw i+" != "+t;return s}(),r="?".charCodeAt(0);return function(e){const t=[];for(let i=0;i<e.length;i+=1){const s=e.charCodeAt(i);if(s<128)t.push(s);else{const s=o[e.charAt(i)];"number"==typeof s?(255&s)==s?t.push(s):(t.push(s>>>8),t.push(255&s)):t.push(r)}}return t}};const je=1,Ue=2,Fe=4,We=8,qe={L:1,M:0,Q:3,H:2},He=0,Ve=1,Xe=2,Ze=3,Ke=4,Qe=5,Ye=6,Ge=7,Je=function(){const e=[[],[6,18],[6,22],[6,26],[6,30],[6,34],[6,22,38],[6,24,42],[6,26,46],[6,28,50],[6,30,54],[6,32,58],[6,34,62],[6,26,46,66],[6,26,48,70],[6,26,50,74],[6,30,54,78],[6,30,56,82],[6,30,58,86],[6,34,62,90],[6,28,50,72,94],[6,26,50,74,98],[6,30,54,78,102],[6,28,54,80,106],[6,32,58,84,110],[6,30,58,86,114],[6,34,62,90,118],[6,26,50,74,98,122],[6,30,54,78,102,126],[6,26,52,78,104,130],[6,30,56,82,108,134],[6,34,60,86,112,138],[6,30,58,86,114,142],[6,34,62,90,118,146],[6,30,54,78,102,126,150],[6,24,50,76,102,128,154],[6,28,54,80,106,132,158],[6,32,58,84,110,136,162],[6,26,54,82,110,138,166],[6,30,58,86,114,142,170]],t=1335,o=7973,r={},i=function(e){let t=0;for(;0!=e;)t+=1,e>>>=1;return t};return r.getBCHTypeInfo=function(e){let o=e<<10;for(;i(o)-i(t)>=0;)o^=t<<i(o)-i(t);return 21522^(e<<10|o)},r.getBCHTypeNumber=function(e){let t=e<<12;for(;i(t)-i(o)>=0;)t^=o<<i(t)-i(o);return e<<12|t},r.getPatternPosition=function(t){return e[t-1]},r.getMaskFunction=function(e){switch(e){case He:return function(e,t){return(e+t)%2==0};case Ve:return function(e,t){return e%2==0};case Xe:return function(e,t){return t%3==0};case Ze:return function(e,t){return(e+t)%3==0};case Ke:return function(e,t){return(Math.floor(e/2)+Math.floor(t/3))%2==0};case Qe:return function(e,t){return e*t%2+e*t%3==0};case Ye:return function(e,t){return(e*t%2+e*t%3)%2==0};case Ge:return function(e,t){return(e*t%3+(e+t)%2)%2==0};default:throw"bad maskPattern:"+e}},r.getErrorCorrectPolynomial=function(e){let t=tt([1],0);for(let o=0;o<e;o+=1)t=t.multiply(tt([1,et.gexp(o)],0));return t},r.getLengthInBits=function(e,t){if(1<=t&&t<10)switch(e){case je:return 10;case Ue:return 9;case Fe:case We:return 8;default:throw"mode:"+e}else if(t<27)switch(e){case je:return 12;case Ue:return 11;case Fe:return 16;case We:return 10;default:throw"mode:"+e}else{if(!(t<41))throw"type:"+t;switch(e){case je:return 14;case Ue:return 13;case Fe:return 16;case We:return 12;default:throw"mode:"+e}}},r.getLostPoint=function(e){const t=e.getModuleCount();let o=0;for(let r=0;r<t;r+=1)for(let i=0;i<t;i+=1){let s=0;const n=e.isDark(r,i);for(let o=-1;o<=1;o+=1)if(!(r+o<0||t<=r+o))for(let a=-1;a<=1;a+=1)i+a<0||t<=i+a||0==o&&0==a||n==e.isDark(r+o,i+a)&&(s+=1);s>5&&(o+=3+s-5)}for(let r=0;r<t-1;r+=1)for(let i=0;i<t-1;i+=1){let t=0;e.isDark(r,i)&&(t+=1),e.isDark(r+1,i)&&(t+=1),e.isDark(r,i+1)&&(t+=1),e.isDark(r+1,i+1)&&(t+=1),0!=t&&4!=t||(o+=3)}for(let r=0;r<t;r+=1)for(let i=0;i<t-6;i+=1)e.isDark(r,i)&&!e.isDark(r,i+1)&&e.isDark(r,i+2)&&e.isDark(r,i+3)&&e.isDark(r,i+4)&&!e.isDark(r,i+5)&&e.isDark(r,i+6)&&(o+=40);for(let r=0;r<t;r+=1)for(let i=0;i<t-6;i+=1)e.isDark(i,r)&&!e.isDark(i+1,r)&&e.isDark(i+2,r)&&e.isDark(i+3,r)&&e.isDark(i+4,r)&&!e.isDark(i+5,r)&&e.isDark(i+6,r)&&(o+=40);let r=0;for(let o=0;o<t;o+=1)for(let i=0;i<t;i+=1)e.isDark(i,o)&&(r+=1);return o+=10*(Math.abs(100*r/t/t-50)/5),o},r}(),et=function(){const e=new Array(256),t=new Array(256);for(let t=0;t<8;t+=1)e[t]=1<<t;for(let t=8;t<256;t+=1)e[t]=e[t-4]^e[t-5]^e[t-6]^e[t-8];for(let o=0;o<255;o+=1)t[e[o]]=o;const o={glog:function(e){if(e<1)throw"glog("+e+")";return t[e]},gexp:function(t){for(;t<0;)t+=255;for(;t>=256;)t-=255;return e[t]}};return o}(),tt=function(e,t){if(void 0===e.length)throw e.length+"/"+t;const o=function(){let o=0;for(;o<e.length&&0==e[o];)o+=1;const r=new Array(e.length-o+t);for(let t=0;t<e.length-o;t+=1)r[t]=e[t+o];return r}(),r={getAt:function(e){return o[e]},getLength:function(){return o.length},multiply:function(e){const t=new Array(r.getLength()+e.getLength()-1);for(let o=0;o<r.getLength();o+=1)for(let i=0;i<e.getLength();i+=1)t[o+i]^=et.gexp(et.glog(r.getAt(o))+et.glog(e.getAt(i)));return tt(t,0)},mod:function(e){if(r.getLength()-e.getLength()<0)return r;const t=et.glog(r.getAt(0))-et.glog(e.getAt(0)),o=new Array(r.getLength());for(let e=0;e<r.getLength();e+=1)o[e]=r.getAt(e);for(let r=0;r<e.getLength();r+=1)o[r]^=et.gexp(et.glog(e.getAt(r))+t);return tt(o,0).mod(e)}};return r},ot=function(){const e=[[1,26,19],[1,26,16],[1,26,13],[1,26,9],[1,44,34],[1,44,28],[1,44,22],[1,44,16],[1,70,55],[1,70,44],[2,35,17],[2,35,13],[1,100,80],[2,50,32],[2,50,24],[4,25,9],[1,134,108],[2,67,43],[2,33,15,2,34,16],[2,33,11,2,34,12],[2,86,68],[4,43,27],[4,43,19],[4,43,15],[2,98,78],[4,49,31],[2,32,14,4,33,15],[4,39,13,1,40,14],[2,121,97],[2,60,38,2,61,39],[4,40,18,2,41,19],[4,40,14,2,41,15],[2,146,116],[3,58,36,2,59,37],[4,36,16,4,37,17],[4,36,12,4,37,13],[2,86,68,2,87,69],[4,69,43,1,70,44],[6,43,19,2,44,20],[6,43,15,2,44,16],[4,101,81],[1,80,50,4,81,51],[4,50,22,4,51,23],[3,36,12,8,37,13],[2,116,92,2,117,93],[6,58,36,2,59,37],[4,46,20,6,47,21],[7,42,14,4,43,15],[4,133,107],[8,59,37,1,60,38],[8,44,20,4,45,21],[12,33,11,4,34,12],[3,145,115,1,146,116],[4,64,40,5,65,41],[11,36,16,5,37,17],[11,36,12,5,37,13],[5,109,87,1,110,88],[5,65,41,5,66,42],[5,54,24,7,55,25],[11,36,12,7,37,13],[5,122,98,1,123,99],[7,73,45,3,74,46],[15,43,19,2,44,20],[3,45,15,13,46,16],[1,135,107,5,136,108],[10,74,46,1,75,47],[1,50,22,15,51,23],[2,42,14,17,43,15],[5,150,120,1,151,121],[9,69,43,4,70,44],[17,50,22,1,51,23],[2,42,14,19,43,15],[3,141,113,4,142,114],[3,70,44,11,71,45],[17,47,21,4,48,22],[9,39,13,16,40,14],[3,135,107,5,136,108],[3,67,41,13,68,42],[15,54,24,5,55,25],[15,43,15,10,44,16],[4,144,116,4,145,117],[17,68,42],[17,50,22,6,51,23],[19,46,16,6,47,17],[2,139,111,7,140,112],[17,74,46],[7,54,24,16,55,25],[34,37,13],[4,151,121,5,152,122],[4,75,47,14,76,48],[11,54,24,14,55,25],[16,45,15,14,46,16],[6,147,117,4,148,118],[6,73,45,14,74,46],[11,54,24,16,55,25],[30,46,16,2,47,17],[8,132,106,4,133,107],[8,75,47,13,76,48],[7,54,24,22,55,25],[22,45,15,13,46,16],[10,142,114,2,143,115],[19,74,46,4,75,47],[28,50,22,6,51,23],[33,46,16,4,47,17],[8,152,122,4,153,123],[22,73,45,3,74,46],[8,53,23,26,54,24],[12,45,15,28,46,16],[3,147,117,10,148,118],[3,73,45,23,74,46],[4,54,24,31,55,25],[11,45,15,31,46,16],[7,146,116,7,147,117],[21,73,45,7,74,46],[1,53,23,37,54,24],[19,45,15,26,46,16],[5,145,115,10,146,116],[19,75,47,10,76,48],[15,54,24,25,55,25],[23,45,15,25,46,16],[13,145,115,3,146,116],[2,74,46,29,75,47],[42,54,24,1,55,25],[23,45,15,28,46,16],[17,145,115],[10,74,46,23,75,47],[10,54,24,35,55,25],[19,45,15,35,46,16],[17,145,115,1,146,116],[14,74,46,21,75,47],[29,54,24,19,55,25],[11,45,15,46,46,16],[13,145,115,6,146,116],[14,74,46,23,75,47],[44,54,24,7,55,25],[59,46,16,1,47,17],[12,151,121,7,152,122],[12,75,47,26,76,48],[39,54,24,14,55,25],[22,45,15,41,46,16],[6,151,121,14,152,122],[6,75,47,34,76,48],[46,54,24,10,55,25],[2,45,15,64,46,16],[17,152,122,4,153,123],[29,74,46,14,75,47],[49,54,24,10,55,25],[24,45,15,46,46,16],[4,152,122,18,153,123],[13,74,46,32,75,47],[48,54,24,14,55,25],[42,45,15,32,46,16],[20,147,117,4,148,118],[40,75,47,7,76,48],[43,54,24,22,55,25],[10,45,15,67,46,16],[19,148,118,6,149,119],[18,75,47,31,76,48],[34,54,24,34,55,25],[20,45,15,61,46,16]],t=function(e,t){const o={};return o.totalCount=e,o.dataCount=t,o},o={};return o.getRSBlocks=function(o,r){const i=function(t,o){switch(o){case qe.L:return e[4*(t-1)+0];case qe.M:return e[4*(t-1)+1];case qe.Q:return e[4*(t-1)+2];case qe.H:return e[4*(t-1)+3];default:return}}(o,r);if(void 0===i)throw"bad rs block @ typeNumber:"+o+"/errorCorrectionLevel:"+r;const s=i.length/3,n=[];for(let e=0;e<s;e+=1){const o=i[3*e+0],r=i[3*e+1],s=i[3*e+2];for(let e=0;e<o;e+=1)n.push(t(r,s))}return n},o}(),rt=function(){const e=[];let t=0;const o={getBuffer:function(){return e},getAt:function(t){const o=Math.floor(t/8);return 1==(e[o]>>>7-t%8&1)},put:function(e,t){for(let r=0;r<t;r+=1)o.putBit(1==(e>>>t-r-1&1))},getLengthInBits:function(){return t},putBit:function(o){const r=Math.floor(t/8);e.length<=r&&e.push(0),o&&(e[r]|=128>>>t%8),t+=1}};return o},it=function(e){const t=je,o=e,r={getMode:function(){return t},getLength:function(e){return o.length},write:function(e){const t=o;let r=0;for(;r+2<t.length;)e.put(i(t.substring(r,r+3)),10),r+=3;r<t.length&&(t.length-r==1?e.put(i(t.substring(r,r+1)),4):t.length-r==2&&e.put(i(t.substring(r,r+2)),7))}},i=function(e){let t=0;for(let o=0;o<e.length;o+=1)t=10*t+s(e.charAt(o));return t},s=function(e){if("0"<=e&&e<="9")return e.charCodeAt(0)-"0".charCodeAt(0);throw"illegal char :"+e};return r},st=function(e){const t=Ue,o=e,r={getMode:function(){return t},getLength:function(e){return o.length},write:function(e){const t=o;let r=0;for(;r+1<t.length;)e.put(45*i(t.charAt(r))+i(t.charAt(r+1)),11),r+=2;r<t.length&&e.put(i(t.charAt(r)),6)}},i=function(e){if("0"<=e&&e<="9")return e.charCodeAt(0)-"0".charCodeAt(0);if("A"<=e&&e<="Z")return e.charCodeAt(0)-"A".charCodeAt(0)+10;switch(e){case" ":return 36;case"$":return 37;case"%":return 38;case"*":return 39;case"+":return 40;case"-":return 41;case".":return 42;case"/":return 43;case":":return 44;default:throw"illegal char :"+e}};return r},nt=function(e){const t=Fe,o=Re.stringToBytes(e),r={getMode:function(){return t},getLength:function(e){return o.length},write:function(e){for(let t=0;t<o.length;t+=1)e.put(o[t],8)}};return r},at=function(e){const t=We,o=Re.stringToBytes;!function(){const e=o("友");if(2!=e.length||38726!=(e[0]<<8|e[1]))throw"sjis not supported."}();const r=o(e),i={getMode:function(){return t},getLength:function(e){return~~(r.length/2)},write:function(e){const t=r;let o=0;for(;o+1<t.length;){let r=(255&t[o])<<8|255&t[o+1];if(33088<=r&&r<=40956)r-=33088;else{if(!(57408<=r&&r<=60351))throw"illegal char at "+(o+1)+"/"+r;r-=49472}r=192*(r>>>8&255)+(255&r),e.put(r,13),o+=2}if(o<t.length)throw"illegal char at "+(o+1)}};return i},ct=function(){const e=[],t={writeByte:function(t){e.push(255&t)},writeShort:function(e){t.writeByte(e),t.writeByte(e>>>8)},writeBytes:function(e,o,r){o=o||0,r=r||e.length;for(let i=0;i<r;i+=1)t.writeByte(e[i+o])},writeString:function(e){for(let o=0;o<e.length;o+=1)t.writeByte(e.charCodeAt(o))},toByteArray:function(){return e},toString:function(){let t="";t+="[";for(let o=0;o<e.length;o+=1)o>0&&(t+=","),t+=e[o];return t+="]",t}};return t},lt=function(e){const t=e;let o=0,r=0,i=0;const s={read:function(){for(;i<8;){if(o>=t.length){if(0==i)return-1;throw"unexpected end of file./"+i}const e=t.charAt(o);if(o+=1,"="==e)return i=0,-1;e.match(/^\s$/)||(r=r<<6|n(e.charCodeAt(0)),i+=6)}const e=r>>>i-8&255;return i-=8,e}},n=function(e){if(65<=e&&e<=90)return e-65;if(97<=e&&e<=122)return e-97+26;if(48<=e&&e<=57)return e-48+52;if(43==e)return 62;if(47==e)return 63;throw"c:"+e};return s},dt=function(e,t,o){const r=function(e,t){const o=e,r=t,i=new Array(e*t),s={setPixel:function(e,t,r){i[t*o+e]=r},write:function(e){e.writeString("GIF87a"),e.writeShort(o),e.writeShort(r),e.writeByte(128),e.writeByte(0),e.writeByte(0),e.writeByte(0),e.writeByte(0),e.writeByte(0),e.writeByte(255),e.writeByte(255),e.writeByte(255),e.writeString(","),e.writeShort(0),e.writeShort(0),e.writeShort(o),e.writeShort(r),e.writeByte(0);const t=n(2);e.writeByte(2);let i=0;for(;t.length-i>255;)e.writeByte(255),e.writeBytes(t,i,255),i+=255;e.writeByte(t.length-i),e.writeBytes(t,i,t.length-i),e.writeByte(0),e.writeString(";")}},n=function(e){const t=1<<e,o=1+(1<<e);let r=e+1;const s=a();for(let e=0;e<t;e+=1)s.add(String.fromCharCode(e));s.add(String.fromCharCode(t)),s.add(String.fromCharCode(o));const n=ct(),c=function(e){const t=e;let o=0,r=0;return{write:function(e,i){if(e>>>i!=0)throw"length over";for(;o+i>=8;)t.writeByte(255&(e<<o|r)),i-=8-o,e>>>=8-o,r=0,o=0;r|=e<<o,o+=i},flush:function(){o>0&&t.writeByte(r)}}}(n);c.write(t,r);let l=0,d=String.fromCharCode(i[l]);for(l+=1;l<i.length;){const e=String.fromCharCode(i[l]);l+=1,s.contains(d+e)?d+=e:(c.write(s.indexOf(d),r),s.size()<4095&&(s.size()==1<<r&&(r+=1),s.add(d+e)),d=e)}return c.write(s.indexOf(d),r),c.write(o,r),c.flush(),n.toByteArray()},a=function(){const e={};let t=0;const o={add:function(r){if(o.contains(r))throw"dup key:"+r;e[r]=t,t+=1},size:function(){return t},indexOf:function(t){return e[t]},contains:function(t){return void 0!==e[t]}};return o};return s}(e,t);for(let i=0;i<t;i+=1)for(let t=0;t<e;t+=1)r.setPixel(t,i,o(t,i));const i=ct();r.write(i);const s=function(){let e=0,t=0,o=0,r="";const i={},s=function(e){r+=String.fromCharCode(n(63&e))},n=function(e){if(e<0)throw"n:"+e;if(e<26)return 65+e;if(e<52)return e-26+97;if(e<62)return e-52+48;if(62==e)return 43;if(63==e)return 47;throw"n:"+e};return i.writeByte=function(r){for(e=e<<8|255&r,t+=8,o+=1;t>=6;)s(e>>>t-6),t-=6},i.flush=function(){if(t>0&&(s(e<<6-t),e=0,t=0),o%3!=0){const e=3-o%3;for(let t=0;t<e;t+=1)r+="="}},i.toString=function(){return r},i}(),n=i.toByteArray();for(let e=0;e<n.length;e+=1)s.writeByte(n[e]);return s.flush(),"data:image/gif;base64,"+s},ut="fi:";function ht(e){return`${ut}${e.id}`}function pt(e,t=4){const o=Re(0,"M");return o.addData(ht(e)),o.make(),o.createSvgTag({cellSize:t,margin:0,scalable:!0})}function mt(e){return e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;")}function ft(e,t,o={width:null,height:null}){const r=document.createElement("iframe");r.style.position="fixed",r.style.right="0",r.style.bottom="0",r.style.width="0",r.style.height="0",r.style.border="0",document.body.appendChild(r);const i=r.contentDocument;if(!i)return void r.remove();const s=o.width?function(e){const t=e.width??88,o=e.height??36,r=o<=20;return`\n  @page { size: ${t}mm ${o}mm; margin: 0; }\n  body { margin: 0; font-family: system-ui, sans-serif; color: #000; background: #fff; }\n  .label {\n    display: flex;\n    align-items: center;\n    gap: ${r?1.5:3}mm;\n    width: ${t}mm;\n    height: ${o}mm;\n    padding: ${r?1:2}mm;\n    box-sizing: border-box;\n    page-break-after: always;\n    overflow: hidden;\n  }\n  .qr { flex: none; width: ${o-(r?2:4)}mm; height: ${o-(r?2:4)}mm; }\n  .qr svg { width: 100%; height: 100%; }\n  .text { min-width: 0; }\n  .name { font-size: ${r?8:12}pt; font-weight: 700; line-height: 1.15; }\n  .meta { font-size: ${r?7:10}pt; margin-top: ${r?.5:1.5}mm; }\n  .note { font-size: ${r?6:8}pt; font-style: italic; margin-top: ${r?0:1}mm; }`}(o):"\n  @page { margin: 10mm; }\n  body {\n    margin: 0;\n    font-family: system-ui, sans-serif;\n    color: #000;\n    background: #fff;\n    display: flex;\n    flex-wrap: wrap;\n    gap: 4mm;\n    align-content: flex-start;\n  }\n  .label {\n    display: flex;\n    align-items: center;\n    gap: 4mm;\n    width: 88mm;\n    min-height: 36mm;\n    border: 0.3mm dashed #999;\n    border-radius: 2mm;\n    padding: 3mm;\n    box-sizing: border-box;\n    page-break-inside: avoid;\n  }\n  .qr { flex: none; width: 28mm; height: 28mm; }\n  .qr svg { width: 100%; height: 100%; }\n  .text { min-width: 0; }\n  .name { font-size: 14pt; font-weight: 700; line-height: 1.2; }\n  .meta { font-size: 12pt; margin-top: 1.5mm; }\n  .note { font-size: 10pt; font-style: italic; margin-top: 1mm; }";i.open(),i.write(`<!doctype html>\n<html>\n<head>\n<meta charset="utf-8">\n<title>Freezer Inventory Labels</title>\n<style>${s}</style>\n</head>\n<body>${e.map(e=>function(e,t){const o=[];return null!=e.weight&&o.push(`${e.weight} ${e.unit||"g"}`),null!=e.pieces&&o.push(`${e.pieces} ${t("pieces_short")}`),`\n    <div class="label">\n      <div class="qr">${pt(e)}</div>\n      <div class="text">\n        <div class="name">${mt(e.product_name)}</div>\n        <div class="meta">${ge(e)}${o.length?" · "+o.join(" · "):""}</div>\n        ${e.note?`<div class="note">${mt(e.note)}</div>`:""}\n      </div>\n    </div>`}(e,t)).join("")}</body>\n</html>`),i.close();const n=r.contentWindow;n&&(n.focus(),n.print()),setTimeout(()=>r.remove(),6e4)}function gt(e,t,o){const r=o.width??50,i=o.height??30,s=8*r,n=8*i,a=i<=20,c=document.createElement("canvas");c.width=s,c.height=n;const l=c.getContext("2d");l.fillStyle="#fff",l.fillRect(0,0,s,n);const d=Math.round(8*(a?1:2)),u=Math.min(n-2*d,Math.round(.36*s)),h=Math.round((n-u)/2),p=Re(0,"M");p.addData(ht(e)),p.make();const m=p.getModuleCount(),f=u/m;l.fillStyle="#000";for(let e=0;e<m;e++)for(let t=0;t<m;t++)p.isDark(e,t)&&l.fillRect(d+Math.floor(t*f),h+Math.floor(e*f),Math.ceil(f),Math.ceil(f));const g=d+u+d,_=s-g-d,v=(e,t,o)=>{let r=t;const i=Math.round(.6*t);let s="";for(;s=`${o} ${r}px system-ui, sans-serif`.trim(),l.font=s,!(l.measureText(e).width<=_||r<=i);)r-=1;if(l.measureText(e).width<=_)return{text:e,font:s,size:r};let n=e;for(;n.length>1&&l.measureText(`${n}…`).width>_;)n=n.slice(0,-1);return{text:`${n}…`,font:s,size:r}},k=[];null!=e.weight&&k.push(`${e.weight} ${e.unit||"g"}`),null!=e.pieces&&k.push(`${e.pieces} ${t("pieces_short")}`);const w=`${ge(e)}${k.length?" · "+k.join(" · "):""}`,b=[v(e.product_name,Math.round(8*(a?2.9:4)),"700"),v(w,Math.round(8*(a?2.4:3)),"")];e.note&&!a&&b.push(v(e.note,Math.round(19.2),"italic"));const y=Math.round(7.2),B=b.reduce((e,t)=>e+t.size,0)+y*(b.length-1);let C=Math.max(d,Math.round((n-B)/2));l.fillStyle="#000",l.textBaseline="top";for(const e of b)l.font=e.font,l.fillText(e.text,g,C),C+=e.size+y;return c}function _t(e){return`stitek-${e.product_name.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g,"").replace(/[^a-z0-9]+/g,"-").replace(/^-+|-+$/g,"")||"polozka"}-${String(e.month).padStart(2,"0")}-${e.year}.png`}function vt(e,t){const o=document.createElement("a");o.href=e,o.download=t,document.body.appendChild(o),o.click(),o.remove()}async function kt(e,t,o){const r=e.map(e=>({name:_t(e),dataUrl:gt(e,t,o).toDataURL("image/png")}));if(1===r.length&&"function"==typeof navigator.share)try{const e=function(e,t){const[o,r]=e.split(","),i=/data:(.*?);/.exec(o)?.[1]??"image/png",s=atob(r),n=new Uint8Array(s.length);for(let e=0;e<s.length;e++)n[e]=s.charCodeAt(e);return new File([n],t,{type:i})}(r[0].dataUrl,r[0].name);if(!navigator.canShare||navigator.canShare({files:[e]}))return await navigator.share({files:[e]}),"shared"}catch(e){if("AbortError"===e?.name)return"shared"}for(const e of r)vt(e.dataUrl,e.name);return"downloaded"}class wt extends ae{constructor(){super(...arguments),this._error="",this._stream=null,this._found=!1}connectedCallback(){super.connectedCallback(),this._start()}disconnectedCallback(){super.disconnectedCallback(),this._stop()}async _start(){const e=this.localize;if(!navigator.mediaDevices?.getUserMedia)return void(this._error=e("scan_https"));try{this._stream=await navigator.mediaDevices.getUserMedia({video:{facingMode:"environment"},audio:!1})}catch{return void(this._error=e("scan_camera_denied"))}await this.updateComplete;const t=this.renderRoot.querySelector("video");if(!t||!this._stream)return;t.srcObject=this._stream,await t.play().catch(()=>{});const o=this._makeDetector(t);this._timer=setInterval(async()=>{if(!this._found&&t.videoWidth)try{const e=await o(),t=e?function(e){return e.startsWith(ut)?e.slice(3):null}(e):null;t&&(this._found=!0,this._stop(),be(this,"fi-scan-found",{itemId:t}))}catch{}},300)}_makeDetector(e){if("function"==typeof window.BarcodeDetector){const t=new window.BarcodeDetector({formats:["qr_code"]});return async()=>{const o=await t.detect(e);return o[0]?.rawValue??null}}const t=document.createElement("canvas"),o=t.getContext("2d",{willReadFrequently:!0});return async()=>{const r=Math.min(1,480/e.videoWidth);t.width=Math.round(e.videoWidth*r),t.height=Math.round(e.videoHeight*r),o.drawImage(e,0,0,t.width,t.height);const i=o.getImageData(0,0,t.width,t.height),s=De(i.data,i.width,i.height,{inversionAttempts:"dontInvert"});return s?.data??null}}_stop(){this._timer&&clearInterval(this._timer),this._timer=void 0,this._stream?.getTracks().forEach(e=>e.stop()),this._stream=null}render(){const e=this.localize;return W`
      <h2 class="view-title">${e("scan_title")}</h2>
      ${this._error?W`<div class="error-banner">${this._error}</div>`:W`
            <div class="viewport">
              <video playsinline muted></video>
              <div class="target"></div>
            </div>
            <p class="hint">${e("scan_hint")}</p>
          `}
      <div class="row-of-buttons">
        <button class="btn btn-outline" @click=${()=>be(this,"fi-scan-cancel")}>
          ${e("cancel")}
        </button>
      </div>
      ${H}
    `}static{this.styles=[Ce,n`
      .viewport {
        position: relative;
        border-radius: var(--fi-radius);
        overflow: hidden;
        background: #000;
        aspect-ratio: 4 / 3;
        margin-bottom: 12px;
      }

      video {
        width: 100%;
        height: 100%;
        object-fit: cover;
        display: block;
      }

      .target {
        position: absolute;
        inset: 12%;
        border: 3px solid color-mix(in srgb, var(--fi-accent) 85%, white);
        border-radius: 14px;
        pointer-events: none;
        box-shadow: 0 0 0 100vmax rgba(0, 0, 0, 0.25);
      }

      .hint {
        color: var(--fi-secondary);
        font-size: 14px;
        margin: 0 0 14px;
        text-align: center;
      }
    `]}}e([ue({attribute:!1})],wt.prototype,"localize",void 0),e([he()],wt.prototype,"_error",void 0),customElements.define("fi-scan-view",wt);const bt="__none__";class yt extends ae{constructor(){super(...arguments),this.items=[],this.categories=[],this.oldMonths=6,this.showWeight=!0,this.showNote=!0,this.isAdmin=!1,this._filter=null}_ageClass(e){const t=e.category_id?this.categories.find(t=>t.id===e.category_id):void 0,o=t?.max_months??this.oldMonths,r=ve(e);return r>=o?"danger":r>=Math.ceil(o/2)?"warn":""}_categoryFor(e){return e.category_id?this.categories.find(t=>t.id===e.category_id):void 0}get _filterChips(){const e=new Set(this.items.map(e=>e.category_id??bt)),t=this.categories.filter(t=>t.enabled&&e.has(t.id)).map(e=>({id:e.id,name:e.name}));return e.has(bt)&&t.length&&t.push({id:bt,name:this.localize("uncategorized")}),t}get _visibleItems(){return this._filter?this.items.filter(e=>(e.category_id??bt)===this._filter):this.items}render(){if(!this.items.length)return W`
        <div class="empty">
          <div class="empty-icon"><ha-icon icon="mdi:snowflake"></ha-icon></div>
          <p>${this.localize("empty_freezer")}</p>
          <div class="footer empty-footer">
            <button
              class="btn btn-primary"
              @click=${()=>be(this,"fi-add")}
            >
              ${this.localize("add_first_item")}
            </button>
            ${this.isAdmin?W`
                  <button
                    class="btn btn-quiet manage-btn"
                    title=${this.localize("manage")}
                    aria-label=${this.localize("manage")}
                    @click=${()=>be(this,"fi-manage")}
                  >
                    <ha-icon icon="mdi:cog-outline"></ha-icon>
                  </button>
                `:H}
          </div>
        </div>
      `;const e=this._filterChips;return W`
      ${e.length>1?W`
            <div class="chips filter-row">
              <button
                class="chip ${null===this._filter?"active":""}"
                @click=${()=>this._filter=null}
              >
                ${this.localize("all")}
              </button>
              ${e.map(e=>W`
                  <button
                    class="chip ${this._filter===e.id?"active":""}"
                    @click=${()=>this._filter=this._filter===e.id?null:e.id}
                  >
                    ${e.name}
                  </button>
                `)}
            </div>
          `:H}
      <div class="list" role="list">
        ${this._visibleItems.map(e=>this._renderRow(e))}
      </div>
      <div class="footer">
        <button class="btn btn-primary" @click=${()=>be(this,"fi-add")}>
          ${this.localize("add")}
        </button>
        ${W`
              <button
                class="btn btn-quiet manage-btn"
                title=${this.localize("scan_button")}
                aria-label=${this.localize("scan_button")}
                @click=${()=>be(this,"fi-scan")}
              >
                <ha-icon icon="mdi:qrcode-scan"></ha-icon>
              </button>
            `}
        ${this.isAdmin?W`
              <button
                class="btn btn-quiet manage-btn"
                title=${this.localize("manage")}
                aria-label=${this.localize("manage")}
                @click=${()=>be(this,"fi-manage")}
              >
                <ha-icon icon="mdi:cog-outline"></ha-icon>
              </button>
            `:H}
      </div>
    `}_renderRow(e){const t=this._ageClass(e),o=ve(e),r=this._categoryFor(e),i=[];null!=e.weight&&i.push(`${e.weight} ${e.unit||"g"}`),null!=e.pieces&&i.push(`${e.pieces} ${this.localize("pieces_short")}`);const s=i.length?i.join(" · "):this.localize("no_weight");return W`
      <button
        class="item-row ${t}"
        role="listitem"
        @click=${()=>be(this,"fi-select-item",{item:e})}
      >
        <span
          class="avatar ${t}"
          style=${t?"":we(r?.color)}
        >
          ${ke(r?.icon,"mdi:snowflake")}
        </span>
        <span class="item-main">
          <span class="item-name">${e.product_name}</span>
          <span class="item-sub">
            ${ge(e)}${this.showWeight?W` · ${s}`:H}
            ${this.showNote&&e.note?W`<span class="item-note"> · ${e.note}</span>`:H}
          </span>
        </span>
        ${t?W`<span class="age-badge ${t}"
              >${this.localize("months_old",{months:o})}</span
            >`:H}
      </button>
    `}static{this.styles=[Ce,n`
      .filter-row {
        padding: 4px 0 14px;
      }

      .list {
        display: flex;
        flex-direction: column;
      }

      .item-row {
        display: flex;
        align-items: center;
        gap: 14px;
        width: 100%;
        min-height: var(--fi-row-height);
        padding: 8px 6px;
        border-bottom: 1px solid var(--fi-divider);
        text-align: left;
        position: relative;
        border-radius: 8px;
      }

      .item-row:hover {
        background: color-mix(in srgb, var(--fi-accent) 6%, transparent);
      }

      .item-row.warn::before,
      .item-row.danger::before {
        content: "";
        position: absolute;
        left: -6px;
        top: 8px;
        bottom: 8px;
        width: 4px;
        border-radius: 2px;
      }

      .item-row.warn::before {
        background: var(--fi-warn);
      }

      .item-row.danger::before {
        background: var(--fi-danger);
      }

      .item-main {
        display: flex;
        flex-direction: column;
        gap: 2px;
        min-width: 0;
        flex: 1;
      }

      .item-name {
        font-size: 16px;
        font-weight: 600;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }

      :host([touch]) .item-name {
        font-size: 18px;
      }

      .item-sub {
        font-size: 14px;
        color: var(--fi-secondary);
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }

      .item-note {
        font-style: italic;
      }

      .age-badge {
        flex: none;
        font-size: 12px;
        font-weight: 700;
        padding: 4px 10px;
        border-radius: 12px;
      }

      .age-badge.warn {
        background: color-mix(in srgb, var(--fi-warn) 16%, transparent);
        color: var(--fi-warn);
      }

      .age-badge.danger {
        background: color-mix(in srgb, var(--fi-danger) 15%, transparent);
        color: var(--fi-danger);
      }

      .footer {
        display: flex;
        gap: 10px;
        padding-top: 16px;
        position: sticky;
        bottom: 0;
        background: var(--card-background-color, var(--ha-card-background, #fff));
      }

      .manage-btn {
        width: 52px;
        flex: none;
      }

      .empty {
        text-align: center;
        padding: 28px 8px;
      }

      .empty-icon ha-icon {
        --mdc-icon-size: 56px;
        color: var(--fi-secondary);
        opacity: 0.6;
      }

      .empty p {
        color: var(--fi-secondary);
        font-size: 16px;
        margin: 12px 0 20px;
      }

      .empty-footer {
        position: static;
        padding-top: 0;
      }
    `]}}e([ue({attribute:!1})],yt.prototype,"items",void 0),e([ue({attribute:!1})],yt.prototype,"categories",void 0),e([ue({attribute:!1})],yt.prototype,"localize",void 0),e([ue({attribute:!1})],yt.prototype,"oldMonths",void 0),e([ue({attribute:!1})],yt.prototype,"showWeight",void 0),e([ue({attribute:!1})],yt.prototype,"showNote",void 0),e([ue({attribute:!1})],yt.prototype,"isAdmin",void 0),e([he()],yt.prototype,"_filter",void 0),customElements.define("fi-list-view",yt);class Bt extends ae{constructor(){super(...arguments),this.products=[],this.categories=[]}get _groups(){const e=this.products.filter(e=>e.enabled),t=[];for(const o of this.categories.filter(e=>e.enabled)){const r=e.filter(e=>e.category_id===o.id);r.length&&t.push({category:o,products:r})}const o=new Set(this.categories.map(e=>e.id)),r=e.filter(e=>!e.category_id||!o.has(e.category_id));return r.length&&t.push({category:null,products:r}),t}render(){return W`
      <h2 class="view-title">${this.localize("what_to_add")}</h2>
      ${this._groups.map(e=>W`
          <div class="group">
            ${e.category?W`<h3 class="group-title">${e.category.name}</h3>`:W`<h3 class="group-title">${this.localize("uncategorized")}</h3>`}
            <div class="tiles">
              ${e.products.map(t=>W`
                  <button
                    class="tile"
                    @click=${()=>be(this,"fi-pick-product",{product:t})}
                  >
                    <span class="avatar" style=${we(e.category?.color)}>
                      ${ke(t.icon||e.category?.icon,"mdi:food")}
                    </span>
                    <span class="tile-name">${t.name}</span>
                  </button>
                `)}
            </div>
          </div>
        `)}
      <div class="group">
        <div class="tiles">
          <button
            class="tile other"
            @click=${()=>be(this,"fi-pick-other")}
          >
            <span class="avatar"><ha-icon icon="mdi:pencil-plus"></ha-icon></span>
            <span class="tile-name">${this.localize("other_product")}</span>
          </button>
        </div>
      </div>
      ${H}
    `}static{this.styles=[Ce,n`
      .group {
        margin-bottom: 18px;
      }

      .group-title {
        font-size: 13px;
        font-weight: 700;
        text-transform: uppercase;
        letter-spacing: 0.8px;
        color: var(--fi-secondary);
        margin: 0 0 10px;
      }

      .tiles {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        gap: 10px;
      }

      .tile {
        display: flex;
        align-items: center;
        gap: 12px;
        min-height: 64px;
        padding: 10px 14px;
        border: 1px solid var(--fi-divider);
        border-radius: var(--fi-radius);
        text-align: left;
        transition: background 0.15s ease;
      }

      .tile:hover {
        background: color-mix(in srgb, var(--fi-accent) 7%, transparent);
        border-color: color-mix(in srgb, var(--fi-accent) 40%, transparent);
      }

      .tile-name {
        font-size: 15px;
        font-weight: 600;
        line-height: 1.25;
      }

      :host([touch]) .tile {
        min-height: 72px;
      }

      :host([touch]) .tile-name {
        font-size: 17px;
      }

      .tile.other {
        border-style: dashed;
      }

      @media (max-width: 420px) {
        .tiles {
          grid-template-columns: 1fr;
        }
      }

      @media (min-width: 700px) {
        :host([touch]) .tiles {
          grid-template-columns: repeat(3, 1fr);
        }
      }
    `]}}e([ue({attribute:!1})],Bt.prototype,"products",void 0),e([ue({attribute:!1})],Bt.prototype,"categories",void 0),e([ue({attribute:!1})],Bt.prototype,"localize",void 0),customElements.define("fi-product-picker",Bt);class Ct extends ae{constructor(){super(...arguments),this.product=null,this.item=null,this.submitting=!1,this.errorText="",this._name="",this._weight="",this._originalWeight="",this._pieces="",this._month=(new Date).getMonth()+1,this._year=(new Date).getFullYear(),this._note="",this._quantity=1,this._validationError="",this._confirmZeroWeight=!1}get _isEdit(){return null!==this.item}willUpdate(e){(e.has("item")||e.has("product"))&&this._initFromProps()}_initFromProps(){this._validationError="",this._confirmZeroWeight=!1,this._quantity=1,this.item?(this._name=this.item.product_name,this._weight=null!=this.item.weight?String(this.item.weight):"",this._originalWeight=null!=this.item.original_weight?String(this.item.original_weight):"",this._pieces=null!=this.item.pieces?String(this.item.pieces):"",this._month=this.item.month,this._year=this.item.year,this._note=this.item.note??""):(this._name=this.product?.name??"",this._weight="",this._originalWeight="",this._pieces="",this._month=(new Date).getMonth()+1,this._year=(new Date).getFullYear(),this._note="")}get _showWeightField(){return!!this._isEdit||(!this.product||this.product.ask_for_weight)}_parseWeight(e){const t=e.trim();if(!t)return null;const o=Number(t);return!(!Number.isFinite(o)||o<0||!Number.isInteger(o))&&o}_submit(){const e=this.localize;this._validationError="";const t=this._name.trim();if(!t)return void(this._validationError=e("err_name_required"));const o=this._parseWeight(this._weight);if(!1===o)return void(this._validationError=e("err_invalid_weight"));let r=null;if(this._isEdit&&(r=this._parseWeight(this._originalWeight),!1===r||0===r))return void(this._validationError=e("err_invalid_weight"));const i=this._parseWeight(this._pieces);if(!1===i||0===i)return void(this._validationError=e("err_invalid_pieces"));if(this._month<1||this._month>12)return void(this._validationError=e("err_invalid_month"));const s=(new Date).getFullYear();if(this._year<s-20||this._year>s+5)return void(this._validationError=e("err_invalid_year"));if(!this._isEdit&&0===o)return void(this._validationError=e("err_invalid_weight"));if(this._isEdit&&0===o)return void(this._confirmZeroWeight=!0);const n={product_id:this.product?.id??this.item?.product_id??void 0,product_name:t,month:this._month,year:this._year,weight:o,pieces:i,note:this._note.trim(),quantity:this._quantity};this._isEdit&&(n.original_weight=r),be(this,"fi-form-submit",{result:n})}render(){const e=this.localize;let t=[],o=[];if(!this._isEdit){const e=new Set(this.product?.quick_weights??[]);null!=this.product?.default_weight&&e.add(this.product.default_weight),t=[...e].sort((e,t)=>e-t),o=this.product?.quick_pieces?.length?this.product.quick_pieces:[1,2,3,4,6]}const r=(new Date).getFullYear(),i=[];for(let e=r+1;e>=r-20;e--)i.push(e);return this._confirmZeroWeight?W`
        <h2 class="view-title">${e("edit_item_title")}</h2>
        <p class="confirm-text">${e("weight_zero_remove")}</p>
        <div class="row-of-buttons">
          <button
            class="btn btn-danger"
            @click=${()=>be(this,"fi-form-remove")}
          >
            ${e("remove_item_btn")}
          </button>
          <button
            class="btn btn-outline"
            @click=${()=>this._confirmZeroWeight=!1}
          >
            ${e("cancel")}
          </button>
        </div>
      `:W`
      <h2 class="view-title">
        ${this._isEdit?e("edit_item_title"):e("add_product_title",{name:this._name||"…"})}
      </h2>

      ${this.errorText?W`<div class="error-banner">${this.errorText}</div>`:H}
      ${this._validationError?W`<div class="error-banner">${this._validationError}</div>`:H}

      <div class="form-body">
      ${this._isEdit||!this.product?W`
            <div class="field">
              <label for="name">${e(this._isEdit?"product":"custom_product_name")}</label>
              <input
                id="name"
                type="text"
                .value=${this._name}
                @input=${e=>this._name=e.target.value}
              />
            </div>
          `:H}

      ${this._showWeightField?W`
            <div class="field">
              <label for="weight">
                ${e("weight")} <span class="opt">(${e("optional")})</span>
              </label>
              ${t.length?W`
                    <div class="chips weight-chips">
                      ${t.map(e=>W`
                          <button
                            class="chip ${this._weight===String(e)?"active":""}"
                            @click=${()=>this._weight=this._weight===String(e)?"":String(e)}
                          >
                            ${e} g
                          </button>
                        `)}
                    </div>
                  `:H}
              <div class="weight-input">
                <input
                  id="weight"
                  type="number"
                  inputmode="numeric"
                  min="0"
                  step="1"
                  .value=${this._weight}
                  @input=${e=>this._weight=e.target.value}
                />
                <span class="unit">g</span>
              </div>
            </div>
          `:H}

      <div class="field">
        <label for="pieces">
          ${e("pieces_field")} <span class="opt">(${e("optional")})</span>
        </label>
        ${o.length?W`
              <div class="chips weight-chips">
                ${o.map(t=>W`
                    <button
                      class="chip ${this._pieces===String(t)?"active":""}"
                      @click=${()=>this._pieces=this._pieces===String(t)?"":String(t)}
                    >
                      ${t} ${e("pieces_short")}
                    </button>
                  `)}
              </div>
            `:H}
        <div class="weight-input">
          <input
            id="pieces"
            type="number"
            inputmode="numeric"
            min="1"
            step="1"
            .value=${this._pieces}
            @input=${e=>this._pieces=e.target.value}
          />
          <span class="unit">${e("pieces_short")}</span>
        </div>
      </div>

      ${this._isEdit?W`
            <div class="field">
              <label for="oweight">
                ${e("original_weight")} <span class="opt">(${e("optional")})</span>
              </label>
              <div class="weight-input">
                <input
                  id="oweight"
                  type="number"
                  inputmode="numeric"
                  min="1"
                  step="1"
                  .value=${this._originalWeight}
                  @input=${e=>this._originalWeight=e.target.value}
                />
                <span class="unit">g</span>
              </div>
            </div>
          `:H}

      <div class="two-cols">
        <div class="field">
          <label for="month">${e("month")}</label>
          <select
            id="month"
            .value=${String(this._month)}
            @change=${e=>this._month=Number(e.target.value)}
          >
            ${Array.from({length:12},(e,t)=>t+1).map(t=>W`
                <option value=${t} ?selected=${t===this._month}>
                  ${e(`month_${t}`)}
                </option>
              `)}
          </select>
        </div>
        <div class="field">
          <label for="year">${e("year")}</label>
          <select
            id="year"
            .value=${String(this._year)}
            @change=${e=>this._year=Number(e.target.value)}
          >
            ${i.map(e=>W`
                <option value=${e} ?selected=${e===this._year}>${e}</option>
              `)}
          </select>
        </div>
      </div>

      ${this._isEdit?H:W`
            <div class="field">
              <label>${e("quantity")}</label>
              <div class="stepper">
                <button
                  class="step-btn"
                  aria-label="−"
                  @click=${()=>this._quantity=Math.max(1,this._quantity-1)}
                >
                  −
                </button>
                <span class="step-value">${this._quantity}</span>
                <button
                  class="step-btn"
                  aria-label="+"
                  @click=${()=>this._quantity=Math.min(50,this._quantity+1)}
                >
                  +
                </button>
              </div>
            </div>
          `}

      <div class="field">
        <label for="note">
          ${e("note")} <span class="opt">(${e("optional")})</span>
        </label>
        <input
          id="note"
          type="text"
          .value=${this._note}
          @input=${e=>this._note=e.target.value}
        />
      </div>
      </div>

      <div class="row-of-buttons">
        <button
          class="btn btn-primary"
          ?disabled=${this.submitting}
          @click=${this._submit}
        >
          ${this._isEdit?e("save"):e("add_to_freezer")}
        </button>
        <button
          class="btn btn-outline"
          @click=${()=>be(this,"fi-form-cancel")}
        >
          ${e("cancel")}
        </button>
      </div>
    `}static{this.styles=[Ce,n`
      .two-cols {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 12px;
      }

      .weight-chips {
        margin-bottom: 8px;
      }

      .weight-input {
        display: flex;
        align-items: center;
        gap: 10px;
      }

      .weight-input input {
        flex: 1;
      }

      .unit {
        color: var(--fi-secondary);
        font-weight: 600;
      }

      .stepper {
        display: flex;
        align-items: center;
        gap: 14px;
      }

      .step-btn {
        width: 52px;
        height: 48px;
        border: 1px solid var(--fi-divider);
        border-radius: 10px;
        font-size: 24px;
        font-weight: 600;
        display: flex;
        align-items: center;
        justify-content: center;
      }

      .step-btn:hover {
        background: color-mix(in srgb, var(--fi-accent) 8%, transparent);
      }

      .step-value {
        min-width: 40px;
        text-align: center;
        font-size: 20px;
        font-weight: 700;
      }

      .confirm-text {
        font-size: 16px;
        margin: 0 0 20px;
      }

      button[disabled] {
        opacity: 0.6;
        pointer-events: none;
      }

      /* Tablet mode on a wide screen: two-column form, no scrolling needed */
      @media (min-width: 700px) {
        :host([touch]) .form-body {
          display: grid;
          grid-template-columns: 1fr 1fr;
          column-gap: 24px;
          align-items: start;
        }

        :host([touch]) .row-of-buttons {
          flex-direction: row-reverse;
          justify-content: flex-start;
          gap: 12px;
        }

        :host([touch]) .row-of-buttons .btn {
          width: auto;
          min-width: 220px;
        }
      }
    `]}}e([ue({attribute:!1})],Ct.prototype,"localize",void 0),e([ue({attribute:!1})],Ct.prototype,"product",void 0),e([ue({attribute:!1})],Ct.prototype,"item",void 0),e([ue({attribute:!1})],Ct.prototype,"submitting",void 0),e([ue({attribute:!1})],Ct.prototype,"errorText",void 0),e([he()],Ct.prototype,"_name",void 0),e([he()],Ct.prototype,"_weight",void 0),e([he()],Ct.prototype,"_originalWeight",void 0),e([he()],Ct.prototype,"_pieces",void 0),e([he()],Ct.prototype,"_month",void 0),e([he()],Ct.prototype,"_year",void 0),e([he()],Ct.prototype,"_note",void 0),e([he()],Ct.prototype,"_quantity",void 0),e([he()],Ct.prototype,"_validationError",void 0),e([he()],Ct.prototype,"_confirmZeroWeight",void 0),customElements.define("fi-item-form",Ct);const $t=2;class xt{constructor(e){}get _$AU(){return this._$AM._$AU}_$AT(e,t,o){this._$Ct=e,this._$AM=t,this._$Ci=o}_$AS(e,t){return this.update(e,t)}update(e,t){return this.render(...t)}}class Pt extends xt{constructor(e){if(super(e),this.it=H,e.type!==$t)throw Error(this.constructor.directiveName+"() can only be used in child bindings")}render(e){if(e===H||null==e)return this._t=void 0,this.it=e;if(e===q)return e;if("string"!=typeof e)throw Error(this.constructor.directiveName+"() called with a non-string value");if(e===this.it)return this._t;this.it=e;const t=[e];return t.raw=t,this._t={_$litType$:this.constructor.resultType,strings:t,values:[]}}}Pt.directiveName="unsafeHTML",Pt.resultType=1;const zt=(e=>(...t)=>({_$litDirective$:e,values:t}))(Pt);class Mt extends ae{constructor(){super(...arguments),this.submitting=!1,this.errorText="",this.mode="confirm",this.canMove=!1,this._amount="",this._pieces="",this._validationError=""}willUpdate(e){(e.has("item")||e.has("mode"))&&(this._amount="",this._pieces="",this._validationError="")}get _halfLabel(){const e=this.localize;return null!=this.item.weight?e("remove_half",{half:Math.floor(this.item.weight/2+.5)}):e("remove_half_pieces",{half:Math.floor((this.item.pieces??0)/2+.5)})}_parseField(e){const t=e.trim();if(!t)return null;const o=Number(t);return!(!Number.isFinite(o)||!Number.isInteger(o)||o<=0)&&o}_submitAmount(){const e=this.localize;this._validationError="";const t=null!=this.item.weight?this._parseField(this._amount):null,o=null!=this.item.pieces?this._parseField(this._pieces):null;!1!==t?!1!==o?null!==t||null!==o?null!==t&&t>(this.item.weight??0)?this._validationError=e("err_amount_too_big",{amount:t,weight:this.item.weight??0}):null!==o&&o>(this.item.pieces??0)?this._validationError=e("err_pieces_too_big",{pieces:o,count:this.item.pieces??0}):be(this,"fi-remove-amount",{amount:t,pieces:o}):this._validationError=e("err_nothing_to_remove"):this._validationError=e("err_invalid_pieces"):this._validationError=e("err_invalid_amount")}render(){return"amount"===this.mode?this._renderAmount():this._renderConfirm()}_renderConfirm(){const e=this.localize,t=null!=this.item.weight,o=null!=this.item.pieces,r=t||o&&(this.item.pieces??0)>1;return W`
      <div class="title-row">
        <h2 class="view-title question">
          ${e("remove_question",{label:_e(this.item,e)})}
        </h2>
        <div class="qr" title=${this.item.id}>${zt(pt(this.item,3))}</div>
      </div>
      ${this.item.note?W`
            <p class="note">
              <span class="note-label">${e("note_label")}</span> ${this.item.note}
            </p>
          `:H}
      ${this.errorText?W`<div class="error-banner">${this.errorText}</div>`:H}
      <div class="row-of-buttons">
        <button
          class="btn btn-primary"
          ?disabled=${this.submitting}
          @click=${()=>be(this,"fi-remove-all")}
        >
          ${e("remove_all")}
        </button>
        ${r?W`
              <button
                class="btn btn-outline"
                ?disabled=${this.submitting}
                @click=${()=>be(this,"fi-remove-half")}
              >
                ${this._halfLabel}
              </button>
            `:H}
        ${t||o?W`
              <button
                class="btn btn-outline"
                @click=${()=>be(this,"fi-enter-amount")}
              >
                ${e("remove_amount")}
              </button>
            `:H}
        <button
          class="btn btn-outline"
          @click=${()=>be(this,"fi-edit-item")}
        >
          ${e("edit")}
        </button>
        ${this.canMove?W`
              <button
                class="btn btn-outline"
                @click=${()=>be(this,"fi-move-item")}
              >
                ${e("move")}
              </button>
            `:H}
        <button
          class="btn btn-outline"
          @click=${()=>be(this,"fi-print-label")}
        >
          ${e("print_label")}
        </button>
        <button
          class="btn btn-quiet"
          @click=${()=>be(this,"fi-remove-cancel")}
        >
          ${e("cancel")}
        </button>
      </div>
    `}_renderAmount(){const e=this.localize,t=null!=this.item.weight,o=null!=this.item.pieces,r=this.item.weight??0,i=this.item.pieces??0,s=this.item.unit||"g",n=e("pieces_short"),a=this._parseField(this._amount),c=this._parseField(this._pieces),l=t&&a&&a<=r?r-a:null,d=o&&c&&c<=i?i-c:null,u=[];t&&u.push(`${r} ${s}`),o&&u.push(`${i} ${n}`);const h=[];return null!==l?h.push(`${l} ${s}`):t&&c&&h.push(`${r} ${s}`),null!==d?h.push(`${d} ${n}`):o&&a&&h.push(`${i} ${n}`),W`
      <h2 class="view-title">${e("how_much_remove")}</h2>
      <p class="current">
        ${e("currently_in_freezer")}
        <strong>${u.join(" · ")}</strong>
      </p>
      ${this.errorText?W`<div class="error-banner">${this.errorText}</div>`:H}
      ${this._validationError?W`<div class="error-banner">${this._validationError}</div>`:H}
      <div class="form-body">
      ${t?W`
            <div class="field">
              <label>${e("weight")}</label>
              <div class="amount-input">
                <input
                  type="number"
                  inputmode="numeric"
                  min="1"
                  max=${r}
                  step="1"
                  .value=${this._amount}
                  @input=${e=>this._amount=e.target.value}
                />
                <span class="unit">${s}</span>
              </div>
            </div>
          `:H}
      ${o?W`
            <div class="field">
              <label>${e("pieces_field")}</label>
              <div class="amount-input">
                <input
                  type="number"
                  inputmode="numeric"
                  min="1"
                  max=${i}
                  step="1"
                  .value=${this._pieces}
                  @input=${e=>this._pieces=e.target.value}
                />
                <span class="unit">${n}</span>
              </div>
            </div>
          `:H}
      </div>
      ${h.length&&(a||c)?W`
            <p class="remaining">
              ${e("remaining_after")}
              <strong>${h.join(" · ")}</strong>
            </p>
          `:H}
      <div class="row-of-buttons">
        <button
          class="btn btn-primary"
          ?disabled=${this.submitting}
          @click=${this._submitAmount}
        >
          ${e("confirm")}
        </button>
        <button
          class="btn btn-quiet"
          @click=${()=>be(this,"fi-remove-cancel")}
        >
          ${e("cancel")}
        </button>
      </div>
    `}static{this.styles=[Ce,n`
      .question {
        line-height: 1.35;
      }

      .title-row {
        display: flex;
        align-items: flex-start;
        justify-content: space-between;
        gap: 14px;
      }

      .title-row .view-title {
        flex: 1;
        min-width: 0;
      }

      .qr {
        flex: none;
        width: 84px;
        height: 84px;
        padding: 6px;
        background: #fff;
        border-radius: 8px;
      }

      .qr svg {
        width: 100%;
        height: 100%;
        display: block;
      }

      .note {
        margin: -6px 0 16px;
        font-size: 15px;
      }

      .note-label {
        color: var(--fi-secondary);
        font-weight: 600;
      }

      .current,
      .remaining {
        font-size: 15px;
        margin: 0 0 14px;
      }

      .amount-input {
        display: flex;
        align-items: center;
        gap: 10px;
      }

      .amount-input input {
        flex: 1;
        font-size: 22px;
        font-weight: 700;
        text-align: center;
      }

      .unit {
        color: var(--fi-secondary);
        font-weight: 600;
        font-size: 18px;
      }

      button[disabled] {
        opacity: 0.6;
        pointer-events: none;
      }

      /* Tablet mode on a wide screen: fields side by side, buttons in a grid */
      @media (min-width: 700px) {
        :host([touch]) .form-body {
          display: grid;
          grid-template-columns: 1fr 1fr;
          column-gap: 24px;
          align-items: start;
        }

        :host([touch]) .row-of-buttons {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 12px;
        }

        :host([touch]) .row-of-buttons .btn:first-child {
          grid-column: 1 / -1;
        }
      }
    `]}}e([ue({attribute:!1})],Mt.prototype,"localize",void 0),e([ue({attribute:!1})],Mt.prototype,"item",void 0),e([ue({attribute:!1})],Mt.prototype,"submitting",void 0),e([ue({attribute:!1})],Mt.prototype,"errorText",void 0),e([ue({attribute:!1})],Mt.prototype,"mode",void 0),e([ue({attribute:!1})],Mt.prototype,"canMove",void 0),e([he()],Mt.prototype,"_amount",void 0),e([he()],Mt.prototype,"_pieces",void 0),e([he()],Mt.prototype,"_validationError",void 0),customElements.define("fi-remove-dialog",Mt);const At=["#f59e0b","#f06292","#c62828","#8e24aa","#0288d1","#2e7d32","#00897b","#607d8b"];class St extends ae{constructor(){super(...arguments),this.categories=[],this.products=[],this._tab="products",this._editing=null,this._confirm=null,this._error="",this._busy=!1,this._fName="",this._fIcon="",this._fCategoryId="",this._fDefaultWeight="",this._fQuickWeights="",this._fQuickPieces="",this._fAskForWeight=!0,this._fEnabled=!0,this._fMaxMonths="",this._fColor=null}async _run(e){this._busy=!0,this._error="";try{await e(),this._editing=null,this._confirm=null}catch(e){this._error=Ee(e,this.localize("err_generic"))}finally{this._busy=!1}}_startEditCategory(e){this._editing={kind:"category",category:e},this._error="",this._fName=e?.name??"",this._fIcon=e?.icon??"",this._fEnabled=e?.enabled??!0,this._fMaxMonths=null!=e?.max_months?String(e.max_months):"",this._fColor=e?.color??null}_startEditProduct(e){this._editing={kind:"product",product:e},this._error="",this._fName=e?.name??"",this._fIcon=e?.icon??"",this._fCategoryId=e?.category_id??"",this._fDefaultWeight=null!=e?.default_weight?String(e.default_weight):"",this._fQuickWeights=(e?.quick_weights??[]).join(", "),this._fQuickPieces=(e?.quick_pieces??[]).join(", "),this._fAskForWeight=e?.ask_for_weight??!0,this._fEnabled=e?.enabled??!0}_parseOptionalInt(e){const t=e.trim();if(!t)return null;const o=Number(t);return Number.isInteger(o)&&o>0?o:null}async _saveCategory(){const e=this._editing;if(!e||"category"!==e.kind)return;const t={name:this._fName.trim(),icon:this._fIcon.trim()||"mdi:food",color:this._fColor,max_months:this._parseOptionalInt(this._fMaxMonths)};await this._run(async()=>{e.category?await async function(e,t,o){return(await e.callWS({type:`${$e}/category/update`,category_id:t,...o})).category}(this.hass,e.category.id,{...t,enabled:this._fEnabled}):await async function(e,t){return(await e.callWS({type:`${$e}/category/create`,...t})).category}(this.hass,t)})}async _saveProduct(){const e=this._editing;if(!e||"product"!==e.kind)return;const t=e=>e.split(",").map(e=>Number(e.trim())).filter(e=>Number.isInteger(e)&&e>0),o={name:this._fName.trim(),icon:this._fIcon.trim()||"mdi:food",category_id:this._fCategoryId||null,default_weight:this._parseOptionalInt(this._fDefaultWeight),quick_weights:t(this._fQuickWeights),quick_pieces:t(this._fQuickPieces),ask_for_weight:this._fAskForWeight};await this._run(async()=>{e.product?await async function(e,t,o){return(await e.callWS({type:`${$e}/product/update`,product_id:t,...o})).product}(this.hass,e.product.id,{...o,enabled:this._fEnabled}):await async function(e,t){return(await e.callWS({type:`${$e}/product/create`,...t})).product}(this.hass,o)})}async _move(e,t,o){if("category"===e){const e=this.categories.map(e=>e.id),r=e.indexOf(t),i=r+o;if(r<0||i<0||i>=e.length)return;[e[r],e[i]]=[e[i],e[r]],await this._run(()=>async function(e,t){await e.callWS({type:`${$e}/categories/reorder`,category_ids:t})}(this.hass,e))}else{const e=this.products.map(e=>e.id),r=e.indexOf(t),i=r+o;if(r<0||i<0||i>=e.length)return;[e[r],e[i]]=[e[i],e[r]],await this._run(()=>async function(e,t){await e.callWS({type:`${$e}/products/reorder`,product_ids:t})}(this.hass,e))}}render(){const e=this.localize;return this._confirm?W`
        <p class="confirm-text">${this._confirm.text}</p>
        ${this._error?W`<div class="error-banner">${this._error}</div>`:H}
        <div class="row-of-buttons">
          <button
            class="btn btn-danger"
            ?disabled=${this._busy}
            @click=${()=>this._confirm&&this._run(this._confirm.action)}
          >
            ${e("confirm")}
          </button>
          <button class="btn btn-outline" @click=${()=>this._confirm=null}>
            ${e("cancel")}
          </button>
        </div>
      `:"category"===this._editing?.kind?this._renderCategoryForm():"product"===this._editing?.kind?this._renderProductForm():this._renderOverview()}_renderOverview(){const e=this.localize;return W`
      <h2 class="view-title">${e("manage")}</h2>
      <div class="chips tabs">
        <button
          class="chip ${"products"===this._tab?"active":""}"
          @click=${()=>this._tab="products"}
        >
          ${e("products")}
        </button>
        <button
          class="chip ${"categories"===this._tab?"active":""}"
          @click=${()=>this._tab="categories"}
        >
          ${e("categories")}
        </button>
      </div>
      ${this._error?W`<div class="error-banner">${this._error}</div>`:H}
      ${"products"===this._tab?this._renderProductList():this._renderCategoryList()}
      <div class="row-of-buttons bottom">
        <button
          class="btn btn-primary"
          @click=${()=>"products"===this._tab?this._startEditProduct(null):this._startEditCategory(null)}
        >
          ${"products"===this._tab?e("add_product_btn"):e("add_category")}
        </button>
        <button
          class="btn btn-outline"
          @click=${()=>be(this,"fi-print-all")}
        >
          ${e("print_all_labels")}
        </button>
        <button
          class="btn btn-outline"
          @click=${()=>this._confirm={text:e("restore_defaults_confirm"),action:()=>async function(e){await e.callWS({type:`${$e}/restore_defaults`})}(this.hass)}}
        >
          ${e("restore_defaults")}
        </button>
        <button class="btn btn-quiet" @click=${()=>be(this,"fi-manage-close")}>
          ${e("back")}
        </button>
      </div>
    `}_renderCategoryList(){const e=this.localize;return W`
      <div class="rows">
        ${this.categories.map((t,o)=>W`
            <div class="row ${t.enabled?"":"disabled"}">
              <span class="avatar small" style=${we(t.color)}>
                ${ke(t.icon)}
              </span>
              <button class="row-main" @click=${()=>this._startEditCategory(t)}>
                <span class="row-name">${t.name}</span>
                ${null!=t.max_months?W`<span class="row-sub"
                      >${e("max_months")}: ${t.max_months}</span
                    >`:H}
              </button>
              <button
                class="icon-btn"
                title=${e("move_up")}
                ?disabled=${0===o}
                @click=${()=>this._move("category",t.id,-1)}
              >
                <ha-icon icon="mdi:chevron-up"></ha-icon>
              </button>
              <button
                class="icon-btn"
                title=${e("move_down")}
                ?disabled=${o===this.categories.length-1}
                @click=${()=>this._move("category",t.id,1)}
              >
                <ha-icon icon="mdi:chevron-down"></ha-icon>
              </button>
              <button
                class="icon-btn danger"
                title=${e("delete")}
                @click=${()=>this._confirm={text:e("delete_category_confirm",{name:t.name}),action:()=>async function(e,t){await e.callWS({type:`${$e}/category/delete`,category_id:t})}(this.hass,t.id)}}
              >
                <ha-icon icon="mdi:delete-outline"></ha-icon>
              </button>
            </div>
          `)}
      </div>
    `}_renderProductList(){const e=this.localize;return W`
      <div class="rows">
        ${this.products.map((t,o)=>{const r=this.categories.find(e=>e.id===t.category_id);return W`
            <div class="row ${t.enabled?"":"disabled"}">
              <span class="avatar small" style=${we(r?.color)}>
                ${ke(t.icon)}
              </span>
              <button class="row-main" @click=${()=>this._startEditProduct(t)}>
                <span class="row-name">${t.name}</span>
                <span class="row-sub">
                  ${r?.name??e("no_category")}
                  ${null!=t.default_weight?W` · ${t.default_weight} g`:H}
                </span>
              </button>
              <button
                class="icon-btn"
                title=${e("move_up")}
                ?disabled=${0===o}
                @click=${()=>this._move("product",t.id,-1)}
              >
                <ha-icon icon="mdi:chevron-up"></ha-icon>
              </button>
              <button
                class="icon-btn"
                title=${e("move_down")}
                ?disabled=${o===this.products.length-1}
                @click=${()=>this._move("product",t.id,1)}
              >
                <ha-icon icon="mdi:chevron-down"></ha-icon>
              </button>
              <button
                class="icon-btn danger"
                title=${e("delete")}
                @click=${()=>this._confirm={text:e("delete_product_confirm",{name:t.name}),action:()=>async function(e,t){await e.callWS({type:`${$e}/product/delete`,product_id:t})}(this.hass,t.id)}}
              >
                <ha-icon icon="mdi:delete-outline"></ha-icon>
              </button>
            </div>
          `})}
      </div>
    `}_renderCategoryForm(){const e=this.localize,t=this._editing;return W`
      <h2 class="view-title">
        ${t.category?t.category.name:e("add_category")}
      </h2>
      ${this._error?W`<div class="error-banner">${this._error}</div>`:H}
      <div class="field">
        <label>${e("name")}</label>
        <input
          type="text"
          .value=${this._fName}
          @input=${e=>this._fName=e.target.value}
        />
      </div>
      <div class="field">
        <label>${e("icon")} <span class="opt">(🍗 / mdi:…)</span></label>
        <input
          type="text"
          .value=${this._fIcon}
          @input=${e=>this._fIcon=e.target.value}
        />
      </div>
      <div class="field">
        <label>${e("color")}</label>
        <div class="swatches">
          <button
            class="swatch none ${null===this._fColor?"selected":""}"
            title="—"
            @click=${()=>this._fColor=null}
          >
            ✕
          </button>
          ${At.map(e=>W`
              <button
                class="swatch ${this._fColor===e?"selected":""}"
                style="background:${e}"
                title=${e}
                @click=${()=>this._fColor=e}
              ></button>
            `)}
        </div>
      </div>
      <div class="field">
        <label>${e("max_months")} <span class="opt">(${e("optional")})</span></label>
        <input
          type="number"
          min="1"
          step="1"
          .value=${this._fMaxMonths}
          @input=${e=>this._fMaxMonths=e.target.value}
        />
      </div>
      ${t.category?this._renderEnabledToggle():H}
      <div class="row-of-buttons">
        <button
          class="btn btn-primary"
          ?disabled=${this._busy||!this._fName.trim()}
          @click=${this._saveCategory}
        >
          ${e("save")}
        </button>
        <button class="btn btn-outline" @click=${()=>this._editing=null}>
          ${e("cancel")}
        </button>
      </div>
    `}_renderProductForm(){const e=this.localize,t=this._editing;return W`
      <h2 class="view-title">
        ${t.product?t.product.name:e("add_product_btn")}
      </h2>
      ${this._error?W`<div class="error-banner">${this._error}</div>`:H}
      <div class="field">
        <label>${e("name")}</label>
        <input
          type="text"
          .value=${this._fName}
          @input=${e=>this._fName=e.target.value}
        />
      </div>
      <div class="field">
        <label>${e("category")}</label>
        <select
          .value=${this._fCategoryId}
          @change=${e=>this._fCategoryId=e.target.value}
        >
          <option value="" ?selected=${!this._fCategoryId}>
            ${e("no_category")}
          </option>
          ${this.categories.map(e=>W`
              <option
                value=${e.id}
                ?selected=${e.id===this._fCategoryId}
              >
                ${e.name}
              </option>
            `)}
        </select>
      </div>
      <div class="field">
        <label>${e("icon")} <span class="opt">(🍗 / mdi:…)</span></label>
        <input
          type="text"
          .value=${this._fIcon}
          @input=${e=>this._fIcon=e.target.value}
        />
      </div>
      <div class="field">
        <label>${e("default_weight")} <span class="opt">(${e("optional")})</span></label>
        <input
          type="number"
          min="1"
          step="1"
          .value=${this._fDefaultWeight}
          @input=${e=>this._fDefaultWeight=e.target.value}
        />
      </div>
      <div class="field">
        <label>${e("quick_weights")}</label>
        <input
          type="text"
          placeholder="250, 500, 750, 1000"
          .value=${this._fQuickWeights}
          @input=${e=>this._fQuickWeights=e.target.value}
        />
      </div>
      <div class="field">
        <label>${e("quick_pieces")}</label>
        <input
          type="text"
          placeholder="1, 2, 3, 4, 6"
          .value=${this._fQuickPieces}
          @input=${e=>this._fQuickPieces=e.target.value}
        />
      </div>
      <label class="toggle-row">
        <input
          type="checkbox"
          .checked=${this._fAskForWeight}
          @change=${e=>this._fAskForWeight=e.target.checked}
        />
        ${e("ask_for_weight")}
      </label>
      ${t.product?this._renderEnabledToggle():H}
      <div class="row-of-buttons">
        <button
          class="btn btn-primary"
          ?disabled=${this._busy||!this._fName.trim()}
          @click=${this._saveProduct}
        >
          ${e("save")}
        </button>
        <button class="btn btn-outline" @click=${()=>this._editing=null}>
          ${e("cancel")}
        </button>
      </div>
    `}_renderEnabledToggle(){return W`
      <label class="toggle-row">
        <input
          type="checkbox"
          .checked=${this._fEnabled}
          @change=${e=>this._fEnabled=e.target.checked}
        />
        ${this.localize("enabled")}
      </label>
    `}static{this.styles=[Ce,n`
      .tabs {
        margin-bottom: 14px;
      }

      .rows {
        display: flex;
        flex-direction: column;
      }

      .row {
        display: flex;
        align-items: center;
        gap: 10px;
        min-height: 56px;
        border-bottom: 1px solid var(--fi-divider);
        padding: 6px 0;
      }

      .row.disabled {
        opacity: 0.45;
      }

      .avatar.small {
        width: 38px;
        height: 38px;
      }

      .avatar.small ha-icon {
        --mdc-icon-size: 22px;
      }

      .row-main {
        flex: 1;
        min-width: 0;
        display: flex;
        flex-direction: column;
        gap: 2px;
        text-align: left;
        padding: 6px 0;
      }

      .row-name {
        font-weight: 600;
        font-size: 15px;
      }

      .row-sub {
        font-size: 13px;
        color: var(--fi-secondary);
      }

      .icon-btn {
        flex: none;
        width: 42px;
        height: 42px;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        color: var(--fi-secondary);
      }

      .icon-btn:hover {
        background: color-mix(in srgb, var(--fi-accent) 10%, transparent);
      }

      .icon-btn.danger {
        color: var(--fi-danger);
      }

      .icon-btn[disabled] {
        opacity: 0.3;
        pointer-events: none;
      }

      .bottom {
        padding-top: 18px;
      }

      .toggle-row {
        display: flex;
        align-items: center;
        gap: 10px;
        min-height: 44px;
        font-size: 15px;
        margin-bottom: 12px;
        cursor: pointer;
      }

      .toggle-row input {
        width: 20px;
        height: 20px;
      }

      .confirm-text {
        font-size: 16px;
        margin: 4px 0 20px;
        line-height: 1.4;
      }

      .swatches {
        display: flex;
        flex-wrap: wrap;
        gap: 10px;
      }

      .swatch {
        width: 40px;
        height: 40px;
        border-radius: 50%;
        border: 2px solid transparent;
        display: flex;
        align-items: center;
        justify-content: center;
      }

      .swatch.selected {
        border-color: var(--fi-text);
        box-shadow: 0 0 0 2px var(--card-background-color, #fff) inset;
      }

      .swatch.none {
        border: 2px dashed var(--fi-divider);
        color: var(--fi-secondary);
        font-size: 14px;
      }

      button[disabled] {
        opacity: 0.6;
        pointer-events: none;
      }
    `]}}function Et(e,t){if(e>=1e3){const o=e/1e3;return`${(Math.round(10*o)/10).toLocaleString("cs"===t?"cs-CZ":"en-US")} kg`}return`${e} g`}e([ue({attribute:!1})],St.prototype,"hass",void 0),e([ue({attribute:!1})],St.prototype,"localize",void 0),e([ue({attribute:!1})],St.prototype,"categories",void 0),e([ue({attribute:!1})],St.prototype,"products",void 0),e([he()],St.prototype,"_tab",void 0),e([he()],St.prototype,"_editing",void 0),e([he()],St.prototype,"_confirm",void 0),e([he()],St.prototype,"_error",void 0),e([he()],St.prototype,"_busy",void 0),e([he()],St.prototype,"_fName",void 0),e([he()],St.prototype,"_fIcon",void 0),e([he()],St.prototype,"_fCategoryId",void 0),e([he()],St.prototype,"_fDefaultWeight",void 0),e([he()],St.prototype,"_fQuickWeights",void 0),e([he()],St.prototype,"_fQuickPieces",void 0),e([he()],St.prototype,"_fAskForWeight",void 0),e([he()],St.prototype,"_fEnabled",void 0),e([he()],St.prototype,"_fMaxMonths",void 0),e([he()],St.prototype,"_fColor",void 0),customElements.define("fi-manage-view",St);class Tt extends ae{constructor(){super(...arguments),this.stats=null,this.categories=[],this.language="en",this.monthsShown=6}_category(e){return e?this.categories.find(t=>t.id===e):void 0}render(){const e=this.localize;if(!this.stats)return H;const{current:t,monthly:o}=this.stats,r=Math.max(1,...t.categories.map(e=>e.weight)),i=o.slice(-this.monthsShown),s=Math.max(1,...i.flatMap(e=>[e.added_weight,e.removed_weight]));return W`
      <div class="tiles-row">
        <div class="stat-tile">
          <span class="stat-value">${t.item_count}</span>
          <span class="stat-label">${e("stats_items")}</span>
        </div>
        <div class="stat-tile">
          <span class="stat-value"
            >${Et(t.total_weight,this.language)}</span
          >
          <span class="stat-label">${e("stats_weight")}</span>
        </div>
        <div class="stat-tile">
          <span class="stat-value">
            ${null!=t.avg_age_months?e("months_old",{months:t.avg_age_months}):"–"}
          </span>
          <span class="stat-label">${e("stats_avg_age")}</span>
        </div>
      </div>

      ${t.oldest_item?W`
            <p class="oldest">
              ${e("stats_oldest")}:
              <strong>
                ${t.oldest_item.name} ·
                ${String(t.oldest_item.month).padStart(2,"0")}/${t.oldest_item.year}
              </strong>
            </p>
          `:H}

      ${t.categories.length?W`
            <h3 class="section-title">${e("stats_by_category")}</h3>
            <div class="category-bars">
              ${t.categories.map(t=>{const o=this._category(t.category_id),i=o?.color??"var(--fi-accent)",s=Math.max(4,Math.round(t.weight/r*100));return W`
                  <div class="category-row">
                    <span class="avatar small" style=${we(o?.color)}>
                      ${ke(o?.icon,"mdi:snowflake")}
                    </span>
                    <div class="category-main">
                      <div class="category-head">
                        <span class="category-name"
                          >${o?.name??t.category_name??e("uncategorized")}</span
                        >
                        <span class="category-value">
                          ${t.weight?Et(t.weight,this.language):""}
                          · ${t.count}
                        </span>
                      </div>
                      <div class="bar-track">
                        <div
                          class="bar-fill"
                          style="width:${s}%;background:${i}"
                        ></div>
                      </div>
                    </div>
                  </div>
                `})}
            </div>
          `:H}

      ${i.length?W`
            <h3 class="section-title">${e("stats_monthly")}</h3>
            <div class="chart" role="img" aria-label=${e("stats_monthly")}>
              ${i.map(t=>W`
                  <div class="month">
                    <div class="bars">
                      <div
                        class="bar added"
                        title="${e("stats_added")}: ${Et(t.added_weight,this.language)}"
                        style="height:${Math.round(t.added_weight/s*100)}%"
                      ></div>
                      <div
                        class="bar removed"
                        title="${e("stats_removed")}: ${Et(t.removed_weight,this.language)}"
                        style="height:${Math.round(t.removed_weight/s*100)}%"
                      ></div>
                    </div>
                    <span class="month-label"
                      >${t.month.slice(5)}/${t.month.slice(2,4)}</span
                    >
                  </div>
                `)}
            </div>
            <div class="legend">
              <span><i class="dot added"></i>${e("stats_added")}</span>
              <span><i class="dot removed"></i>${e("stats_removed")}</span>
            </div>
          `:H}
    `}static{this.styles=[Ce,n`
      .tiles-row {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        gap: 10px;
        margin-bottom: 14px;
      }

      .stat-tile {
        display: flex;
        flex-direction: column;
        gap: 2px;
        align-items: center;
        border: 1px solid var(--fi-divider);
        border-radius: var(--fi-radius);
        padding: 12px 8px;
        text-align: center;
      }

      .stat-value {
        font-size: 20px;
        font-weight: 700;
      }

      .stat-label {
        font-size: 12px;
        color: var(--fi-secondary);
      }

      .oldest {
        font-size: 14px;
        color: var(--fi-secondary);
        margin: 0 0 14px;
      }

      .oldest strong {
        color: var(--fi-text);
      }

      .section-title {
        font-size: 13px;
        font-weight: 700;
        text-transform: uppercase;
        letter-spacing: 0.8px;
        color: var(--fi-secondary);
        margin: 16px 0 10px;
      }

      .category-row {
        display: flex;
        align-items: center;
        gap: 12px;
        min-height: 52px;
      }

      .avatar.small {
        width: 38px;
        height: 38px;
      }

      .avatar.small ha-icon {
        --mdc-icon-size: 22px;
      }

      .avatar.small .emoji-icon {
        font-size: 20px;
      }

      .category-main {
        flex: 1;
        min-width: 0;
      }

      .category-head {
        display: flex;
        justify-content: space-between;
        gap: 8px;
        font-size: 14px;
        margin-bottom: 4px;
      }

      .category-name {
        font-weight: 600;
      }

      .category-value {
        color: var(--fi-secondary);
        white-space: nowrap;
      }

      .bar-track {
        height: 8px;
        border-radius: 4px;
        background: var(--fi-chip-bg);
        overflow: hidden;
      }

      .bar-fill {
        height: 100%;
        border-radius: 4px;
      }

      .chart {
        display: flex;
        align-items: stretch;
        gap: 8px;
        height: 120px;
      }

      .month {
        flex: 1;
        display: flex;
        flex-direction: column;
        min-width: 0;
      }

      .bars {
        flex: 1;
        display: flex;
        align-items: flex-end;
        justify-content: center;
        gap: 4px;
      }

      .bar {
        width: 14px;
        min-height: 2px;
        border-radius: 4px 4px 0 0;
      }

      .bar.added {
        background: var(--fi-success);
      }

      .bar.removed {
        background: var(--fi-warn);
      }

      .month-label {
        text-align: center;
        font-size: 11px;
        color: var(--fi-secondary);
        margin-top: 6px;
      }

      .legend {
        display: flex;
        gap: 18px;
        justify-content: center;
        margin-top: 10px;
        font-size: 12px;
        color: var(--fi-secondary);
      }

      .legend span {
        display: inline-flex;
        align-items: center;
        gap: 6px;
      }

      .dot {
        width: 10px;
        height: 10px;
        border-radius: 50%;
        display: inline-block;
      }

      .dot.added {
        background: var(--fi-success);
      }

      .dot.removed {
        background: var(--fi-warn);
      }
    `]}}e([ue({attribute:!1})],Tt.prototype,"stats",void 0),e([ue({attribute:!1})],Tt.prototype,"categories",void 0),e([ue({attribute:!1})],Tt.prototype,"localize",void 0),e([ue({attribute:!1})],Tt.prototype,"language",void 0),e([ue({attribute:!1})],Tt.prototype,"monthsShown",void 0),customElements.define("fi-stats-view",Tt);const Lt="main_freezer";console.info("%c FREEZER-INVENTORY-CARD %c 1.1.2 ","color: white; background: #03a9f4; font-weight: 700;","color: #03a9f4; background: white; font-weight: 700;");class It extends ae{constructor(){super(...arguments),this._config={type:""},this._items=[],this._products=[],this._categories=[],this._integration=null,this._dialogOpen=!1,this._view="list",this._selectedItem=null,this._pickedProduct=null,this._customProduct=!1,this._errorText="",this._busy=!1,this._toast=null,this._loaded=!1,this._connectionError="",this._freezers=[],this._stats=null,this._initStarted=!1,this._focusPending=!1,this._historyPushed=!1,this._onPopstate=()=>{this._historyPushed=!1,this._dialogOpen&&("list"!==this._view&&"list"!==this._config.display_mode?(this._backToList(),window.history.pushState({freezerInventoryDialog:!0},""),this._historyPushed=!0):this._closeDialog(!0))},this._onDialogKeydown=e=>{this._resetAutoClose(),"Escape"===e.key&&(e.stopPropagation(),this._closeDialog())}}static getConfigElement(){return Promise.resolve().then(function(){return Dt}),document.createElement("freezer-inventory-card-editor")}static getStubConfig(){return{freezer_id:Lt,display_mode:"popup",touch_mode:!0}}setConfig(e){this._config={...e}}getCardSize(){return"list"===this._config.display_mode?6:2}getGridOptions(){return"list"===this._config.display_mode?{rows:8,columns:12,min_rows:4}:{rows:2,columns:6,min_rows:1}}connectedCallback(){super.connectedCallback(),Be(),this._maybeInit()}disconnectedCallback(){super.disconnectedCallback(),this._unsub?.then(e=>e()).catch(()=>{}),this._unsub=void 0,this._initStarted=!1,this._toastTimer&&clearTimeout(this._toastTimer),this._autoCloseTimer&&clearTimeout(this._autoCloseTimer),this._lockPageOverscroll(!1),window.removeEventListener("popstate",this._onPopstate)}_resetAutoClose(){this._autoCloseTimer&&clearTimeout(this._autoCloseTimer);const e=Number(this._config.auto_close)||0;e>0&&this._dialogOpen&&(this._autoCloseTimer=setTimeout(()=>{this._dialogOpen&&this._closeDialog()},1e3*e))}updated(){this._maybeInit(),this._focusPending&&this._dialogOpen&&(this._focusPending=!1,this.renderRoot.querySelector(".overlay-card")?.focus())}get _freezerId(){return this._config.freezer_id||Lt}get _localize(){return function(e){const t=me[e]??pe;return(e,o)=>{let r=t[e]??pe[e]??e;if(o)for(const[e,t]of Object.entries(o))r=r.replaceAll(`{${e}}`,String(t));return r}}(this._config.language||this._integration?.language||("cs"===this.hass?.locale?.language?"cs":"en"))}get _touchMode(){return!1!==this._config.touch_mode}get _oldMonths(){return this._config.old_months??this._integration?.old_months??6}async _maybeInit(){if(!this._initStarted&&this.hass&&this.isConnected){this._initStarted=!0;try{const[o,r,i,s]=await Promise.all([xe(this.hass),Pe(this.hass),ze(this.hass),Me(this.hass)]);this._integration=o,this._products=r,this._categories=i,this._freezers=s,"stats"===this._config.display_mode&&(this._stats=await Ae(this.hass,this._freezerId)),this._unsub=(e=this.hass,t=e=>this._handleUpdate(e),e.connection.subscribeMessage(t,{type:`${$e}/subscribe_updates`})),await this._unsub,this._loaded=!0,this._connectionError=""}catch(e){this._connectionError=Ee(e,"Freezer Inventory not available"),this._initStarted=!1}var e,t}}async _handleUpdate(e){if("freezers"===e.type&&this.hass)this._freezers=await Me(this.hass);else if("items"===e.type){if("stats"===this._config.display_mode&&this.hass&&(this._stats=await Ae(this.hass,this._freezerId)),e.freezer_id!==this._freezerId)return;if(this._items=e.items,this._loaded=!0,this._selectedItem){const t=e.items.find(e=>e.id===this._selectedItem.id);t?this._selectedItem=t:"remove"!==this._view&&"amount"!==this._view||(this._selectedItem=null,this._view="list")}}else if("catalog"===e.type&&this.hass){const[e,t]=await Promise.all([Pe(this.hass),ze(this.hass)]);this._products=e,this._categories=t}}get _sortedItems(){return"newest_first"===this._config.sort?[...this._items].reverse():this._items}_showToast(e,t=null){this._toastTimer&&clearTimeout(this._toastTimer),this._toast={text:e,undo:t},this._toastTimer=setTimeout(()=>this._toast=null,6e3)}async _undo(){const e=this._toast?.undo;if(this._toast=null,e&&this.hass)try{if("remove"===e.kind)await async function(e,t,o){await e.callWS({type:`${$e}/restore_item`,freezer_id:t,item:o})}(this.hass,this._freezerId,e.item);else{const t={};null!=e.previousWeight&&(t.weight=e.previousWeight),null!=e.previousPieces&&(t.pieces=e.previousPieces),Object.keys(t).length&&await Se(this.hass,this._freezerId,e.item.id,t)}}catch(e){this._showToast(Ee(e,this._localize("err_generic")))}}_lockPageOverscroll(e){const t=document.documentElement.style,o=document.body.style;e&&!this._prevOverscroll?(this._prevOverscroll={html:t.overscrollBehaviorY,body:o.overscrollBehaviorY},t.overscrollBehaviorY="none",o.overscrollBehaviorY="none"):!e&&this._prevOverscroll&&(t.overscrollBehaviorY=this._prevOverscroll.html,o.overscrollBehaviorY=this._prevOverscroll.body,this._prevOverscroll=void 0)}_openDialog(e="list"){this._view=e,this._errorText="",this._dialogOpen=!0,this._focusPending=!0,this._lockPageOverscroll(!0),this._historyPushed||(window.history.pushState({freezerInventoryDialog:!0},""),this._historyPushed=!0,window.addEventListener("popstate",this._onPopstate)),this._resetAutoClose()}_closeDialog(e=!1){this._dialogOpen=!1,this._view="list",this._selectedItem=null,this._pickedProduct=null,this._customProduct=!1,this._errorText="",this._lockPageOverscroll(!1),this._autoCloseTimer&&clearTimeout(this._autoCloseTimer),window.removeEventListener("popstate",this._onPopstate),this._historyPushed&&!e&&(this._historyPushed=!1,window.history.back())}_backToList(){this._view="list",this._selectedItem=null,this._pickedProduct=null,this._customProduct=!1,this._errorText="","list"===this._config.display_mode&&(this._dialogOpen=!1)}async _mutate(e,t){if(this.hass){this._busy=!0,this._errorText="";try{return await e(),!0}catch(e){return this._errorText=Ee(e,t),!1}finally{this._busy=!1}}}async _onFormSubmit(e){const t=e.detail.result,o=this._localize;if("edit"===this._view&&this._selectedItem){const e=this._selectedItem;await this._mutate(()=>Se(this.hass,this._freezerId,e.id,{product_name:t.product_name,month:t.month,year:t.year,weight:t.weight,original_weight:t.original_weight??null,pieces:t.pieces,note:t.note}),o("err_generic"))&&(this._backToList(),this._showToast(o("item_updated")))}else{if(await this._mutate(()=>async function(e,t){await e.callService($e,"add_item",t)}(this.hass,{freezer_id:this._freezerId,product_id:this._customProduct?void 0:this._pickedProduct?.id,product_name:t.product_name,month:t.month,year:t.year,weight:t.weight??void 0,pieces:t.pieces??void 0,note:t.note||void 0,quantity:t.quantity}),o("err_add_failed"))){const e=[t.product_name,`${String(t.month).padStart(2,"0")}/${t.year}`,null!=t.weight?`${t.weight} g`:null,null!=t.pieces?`${t.pieces} ${o("pieces_short")}`:null].filter(Boolean).join(" · "),r=t.quantity>1?`${t.quantity}× `:"";this._backToList(),this._showToast(`${o("added_confirmation")} ${r}${e}`)}}}async _onRemoveAll(){const e=this._selectedItem;if(!e)return;const t=this._localize;await this._mutate(()=>async function(e,t,o){await e.callService($e,"remove_item",{freezer_id:t,item_id:o})}(this.hass,this._freezerId,e.id),t("err_generic"))&&(this._backToList(),this._showToast(t("item_removed"),{kind:"remove",item:e,label:_e(e,t)}))}async _onRemoveHalf(){const e=this._selectedItem;if(!e)return;const t=this._localize,o=e.weight??void 0,r=e.pieces??void 0;await this._mutate(()=>async function(e,t,o){await e.callService($e,"remove_half",{freezer_id:t,item_id:o})}(this.hass,this._freezerId,e.id),t("err_generic"))&&(this._backToList(),this._showToast(t("item_updated"),{kind:"weight",item:e,previousWeight:o,previousPieces:r,label:_e(e,t)}))}async _onRemoveAmount(e){const t=this._selectedItem;if(!t)return;const o=this._localize,{amount:r,pieces:i}=e.detail,s=t.weight??void 0,n=t.pieces??void 0,a=null!=r&&r===t.weight||null!=i&&i===t.pieces;await this._mutate(()=>async function(e,t,o,r){await e.callService($e,"remove_amount",{freezer_id:t,item_id:o,...r})}(this.hass,this._freezerId,t.id,{amount:r??void 0,pieces:i??void 0}),o("err_generic"))&&(this._backToList(),this._showToast(o(a?"item_removed":"item_updated"),a?{kind:"remove",item:t,label:_e(t,o)}:{kind:"weight",item:t,previousWeight:s,previousPieces:n,label:_e(t,o)}))}async _onFormRemove(){await this._onRemoveAll()}async _onMoveTo(e){const t=this._selectedItem;if(!t)return;const o=this._localize;await this._mutate(()=>async function(e,t,o,r){await e.callService($e,"move_item",{item_id:t,source_freezer_id:o,target_freezer_id:r})}(this.hass,t.id,this._freezerId,e.id),o("err_generic"))&&(this._backToList(),this._showToast(o("item_moved",{name:e.name})))}async _print(e){const t=this._localize,o=function(e){const t=/^(\d{1,3})x(\d{1,3})$/.exec((e||"").trim());return t?{width:Number(t[1]),height:Number(t[2])}:{width:null,height:null}}(this._config.label_format);if("image"!==this._config.label_action)navigator.userAgent.includes("Home Assistant")?this._showToast(t("print_unsupported_app")):ft(e,t,o);else try{"downloaded"===await kt(e,t,o)&&this._showToast(t("label_downloaded"))}catch{this._showToast(t("err_generic"))}}_onScanFound(e){const t=this._items.find(t=>t.id===e.detail.itemId);t?(this._selectedItem=t,this._view="remove",this._errorText=""):(this._backToList(),this._showToast(this._localize("scan_not_found")))}render(){if(this._connectionError&&!this._loaded)return W`<ha-card>
        <div class="error-banner card-error">${this._connectionError}</div>
      </ha-card>`;if("stats"===this._config.display_mode)return W`${this._renderStats()} ${this._renderToast()}`;const e="list"===this._config.display_mode;return W`
      ${e?this._renderInlineList():this._renderTile()}
      ${this._renderDialog()} ${this._renderToast()}
    `}_renderStats(){const e=this._localize,t=this._config.name||this._friendlyName();return W`
      <ha-card>
        <div class="inline-header">
          <span class="avatar tile-avatar">
            ${ke(this._config.icon,"mdi:chart-box-outline")}
          </span>
          <span class="tile-text">
            <span class="tile-name">${t}</span>
            <span class="tile-count">${e("stats_monthly")}</span>
          </span>
        </div>
        <div class="inline-body">
          <fi-stats-view
            ?touch=${this._touchMode}
            .stats=${this._stats}
            .categories=${this._categories}
            .localize=${e}
            .language=${this._config.language||this._integration?.language||"en"}
          ></fi-stats-view>
        </div>
      </ha-card>
    `}_renderTile(){const e=this._localize,t=this._config.name||this._friendlyName(),o=this._items.length;return W`
      <ha-card>
        <button class="tile" @click=${()=>this._openDialog("list")}>
          <span class="avatar tile-avatar">
            ${ke(this._config.icon,"mdi:snowflake")}
          </span>
          <span class="tile-text">
            <span class="tile-name">${t}</span>
            ${!1!==this._config.show_count?W`<span class="tile-count"
                  >${fe(e,o)}</span
                >`:H}
          </span>
        </button>
      </ha-card>
    `}_renderInlineList(){const e=this._localize,t=this._config.name||this._friendlyName();return W`
      <ha-card>
        <div class="inline-header">
          <span class="avatar tile-avatar">
            ${ke(this._config.icon,"mdi:snowflake")}
          </span>
          <span class="tile-text">
            <span class="tile-name">${t}</span>
            ${!1!==this._config.show_count?W`<span class="tile-count"
                  >${fe(e,this._items.length)}</span
                >`:H}
          </span>
        </div>
        <div class="inline-body">${this._renderListView()}</div>
      </ha-card>
    `}_friendlyName(){return"en"===this._integration?.language?"Freezer":"Mrazák"}_renderListView(){return W`
      <fi-list-view
        ?touch=${this._touchMode}
        .items=${this._sortedItems}
        .categories=${this._categories}
        .localize=${this._localize}
        .oldMonths=${this._oldMonths}
        .showWeight=${!1!==this._config.show_weight}
        .showNote=${!1!==this._config.show_note}
        .isAdmin=${this.hass?.user?.is_admin??!1}
        @fi-add=${()=>this._openDialog("picker")}
        @fi-manage=${()=>this._openDialog("manage")}
        @fi-scan=${()=>this._openDialog("scan")}
        @fi-select-item=${e=>{this._selectedItem=e.detail.item,this._openDialog("remove")}}
      ></fi-list-view>
    `}_renderCurrentView(){const e=this._localize;switch(this._view){case"picker":return W`
          <fi-product-picker
            ?touch=${this._touchMode}
            .products=${this._products}
            .categories=${this._categories}
            .localize=${e}
            @fi-pick-product=${e=>{this._pickedProduct=e.detail.product,this._customProduct=!1,this._view="form",this._errorText=""}}
            @fi-pick-other=${()=>{this._pickedProduct=null,this._customProduct=!0,this._view="form",this._errorText=""}}
          ></fi-product-picker>
        `;case"form":case"edit":return W`
          <fi-item-form
            ?touch=${this._touchMode}
            .localize=${e}
            .product=${"edit"===this._view?null:this._pickedProduct}
            .item=${"edit"===this._view?this._selectedItem:null}
            .submitting=${this._busy}
            .errorText=${this._errorText}
            @fi-form-submit=${this._onFormSubmit}
            @fi-form-cancel=${()=>this._backToList()}
            @fi-form-remove=${this._onFormRemove}
          ></fi-item-form>
        `;case"remove":case"amount":return this._selectedItem?W`
          <fi-remove-dialog
            ?touch=${this._touchMode}
            .localize=${e}
            .item=${this._selectedItem}
            .mode=${"amount"===this._view?"amount":"confirm"}
            .submitting=${this._busy}
            .errorText=${this._errorText}
            .canMove=${this._freezers.length>1}
            @fi-remove-all=${this._onRemoveAll}
            @fi-remove-half=${this._onRemoveHalf}
            @fi-enter-amount=${()=>{this._view="amount",this._errorText=""}}
            @fi-remove-amount=${this._onRemoveAmount}
            @fi-edit-item=${()=>{this._view="edit",this._errorText=""}}
            @fi-move-item=${()=>{this._view="move",this._errorText=""}}
            @fi-print-label=${()=>this._selectedItem&&this._print([this._selectedItem])}
            @fi-remove-cancel=${()=>"amount"===this._view?(this._view="remove",this._errorText=""):this._backToList()}
          ></fi-remove-dialog>
        `:this._renderListView();case"move":return this._selectedItem?W`
          <h2 class="view-title">${e("move_where")}</h2>
          ${this._errorText?W`<div class="error-banner">${this._errorText}</div>`:H}
          <div class="row-of-buttons">
            ${this._freezers.filter(e=>e.id!==this._freezerId).map(e=>W`
                  <button
                    class="btn btn-outline"
                    ?disabled=${this._busy}
                    @click=${()=>this._onMoveTo(e)}
                  >
                    ${e.name}
                  </button>
                `)}
            <button
              class="btn btn-quiet"
              @click=${()=>{this._view="remove",this._errorText=""}}
            >
              ${e("cancel")}
            </button>
          </div>
        `:this._renderListView();case"scan":return W`
          <fi-scan-view
            ?touch=${this._touchMode}
            .localize=${e}
            @fi-scan-found=${this._onScanFound}
            @fi-scan-cancel=${()=>this._backToList()}
          ></fi-scan-view>
        `;case"manage":return W`
          <fi-manage-view
            ?touch=${this._touchMode}
            .hass=${this.hass}
            .localize=${e}
            .categories=${this._categories}
            .products=${this._products}
            @fi-print-all=${()=>this._print(this._items)}
            @fi-manage-close=${()=>this._backToList()}
          ></fi-manage-view>
        `;default:return this._renderListView()}}_renderDialog(){if(!this._dialogOpen)return H;const e=this._localize,t=this._config.name||this._friendlyName();return W`
      <div
        class="overlay"
        role="dialog"
        aria-modal="true"
        aria-label=${t}
        @keydown=${this._onDialogKeydown}
        @pointerdown=${e=>{this._resetAutoClose(),e.target===e.currentTarget&&this._closeDialog()}}
        @input=${()=>this._resetAutoClose()}
      >
        <div
          class="overlay-card ${this._touchMode?"touch":""}"
          tabindex="-1"
        >
          <div class="dialog-header">
            <h1 class="dialog-title">${t}</h1>
            <button
              class="close-btn"
              aria-label=${e("close")}
              @click=${()=>this._closeDialog()}
            >
              <ha-icon icon="mdi:close"></ha-icon>
            </button>
          </div>
          <div class="dialog-content">${this._renderCurrentView()}</div>
        </div>
      </div>
    `}_renderToast(){return this._toast?W`
      <div class="toast" role="status">
        <span class="toast-text">${this._toast.text}</span>
        ${this._toast.undo?W`
              <button class="toast-undo" @click=${()=>this._undo()}>
                ${this._localize("undo")}
              </button>
            `:H}
      </div>
    `:H}static{this.styles=[Ce,n`
      ha-card {
        overflow: hidden;
      }

      .card-error {
        margin: 12px;
      }

      .tile,
      .inline-header {
        display: flex;
        align-items: center;
        gap: 16px;
        width: 100%;
        padding: 16px;
        text-align: left;
      }

      .tile {
        min-height: 76px;
      }

      .tile:hover {
        background: color-mix(in srgb, var(--fi-accent) 6%, transparent);
      }

      .tile-avatar {
        width: 52px;
        height: 52px;
      }

      .tile-avatar ha-icon {
        --mdc-icon-size: 30px;
      }

      .tile-text {
        display: flex;
        flex-direction: column;
        gap: 2px;
        min-width: 0;
      }

      .tile-name {
        font-size: 18px;
        font-weight: 700;
      }

      .tile-count {
        font-size: 14px;
        color: var(--fi-secondary);
      }

      .inline-header {
        border-bottom: 1px solid var(--fi-divider);
      }

      .inline-body {
        padding: 12px 16px 16px;
      }

      /* Popup: own overlay with fixed header and scrollable body */
      .overlay {
        position: fixed;
        inset: 0;
        background: rgba(0, 0, 0, 0.45);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 999;
        padding: 16px;
      }

      .overlay-card {
        display: flex;
        flex-direction: column;
        min-width: 0;
        background: var(--card-background-color, var(--ha-card-background, #fff));
        border-radius: 16px;
        box-shadow: 0 12px 32px rgba(0, 0, 0, 0.25);
        width: min(520px, 96vw);
        max-height: min(90dvh, 820px);
        overflow: hidden;
        outline: none;
      }

      /* Tablet mode on a wide screen: wider popup, forms fit without scroll */
      @media (min-width: 700px) {
        .overlay-card.touch {
          width: min(860px, 94vw);
        }
      }

      .dialog-header {
        flex: none;
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 12px;
        padding: 14px 20px 10px;
        border-bottom: 1px solid var(--fi-divider);
      }

      .dialog-title {
        font-size: 22px;
        font-weight: 700;
        margin: 0;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }

      .close-btn {
        flex: none;
        width: 44px;
        height: 44px;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        color: var(--fi-secondary);
      }

      .close-btn:hover {
        background: color-mix(in srgb, var(--fi-accent) 10%, transparent);
      }

      .dialog-content {
        flex: 1;
        min-height: 0;
        overflow-y: auto;
        overscroll-behavior: contain;
        -webkit-overflow-scrolling: touch;
        padding: 12px 20px calc(16px + env(safe-area-inset-bottom, 0px));
      }

      /* Toast / undo snackbar */
      .toast {
        position: fixed;
        left: 50%;
        bottom: 28px;
        transform: translateX(-50%);
        display: flex;
        align-items: center;
        gap: 18px;
        background: var(--primary-text-color, #1c1e24);
        color: var(--card-background-color, #fff);
        border-radius: 12px;
        padding: 14px 20px;
        box-shadow: 0 6px 20px rgba(0, 0, 0, 0.3);
        z-index: 10000;
        max-width: min(92vw, 560px);
        font-size: 15px;
      }

      .toast-undo {
        color: var(--fi-accent);
        font-weight: 700;
        letter-spacing: 0.5px;
        white-space: nowrap;
        min-height: 44px;
      }

      @media (max-width: 450px), (max-height: 500px) {
        .overlay {
          padding: 0;
        }

        .overlay-card {
          width: 100vw;
          height: 100dvh;
          max-height: 100dvh;
          border-radius: 0;
        }

        .dialog-header {
          padding-top: max(14px, env(safe-area-inset-top, 0px));
        }

        .dialog-content {
          padding: 12px 16px calc(16px + env(safe-area-inset-bottom, 0px));
        }
      }
    `]}}e([ue({attribute:!1})],It.prototype,"hass",void 0),e([he()],It.prototype,"_config",void 0),e([he()],It.prototype,"_items",void 0),e([he()],It.prototype,"_products",void 0),e([he()],It.prototype,"_categories",void 0),e([he()],It.prototype,"_integration",void 0),e([he()],It.prototype,"_dialogOpen",void 0),e([he()],It.prototype,"_view",void 0),e([he()],It.prototype,"_selectedItem",void 0),e([he()],It.prototype,"_pickedProduct",void 0),e([he()],It.prototype,"_customProduct",void 0),e([he()],It.prototype,"_errorText",void 0),e([he()],It.prototype,"_busy",void 0),e([he()],It.prototype,"_toast",void 0),e([he()],It.prototype,"_loaded",void 0),e([he()],It.prototype,"_connectionError",void 0),e([he()],It.prototype,"_freezers",void 0),e([he()],It.prototype,"_stats",void 0),customElements.define("freezer-inventory-card",It),window.customCards=window.customCards||[],window.customCards.push({type:"freezer-inventory-card",name:"Freezer Inventory Card",description:"Touch-friendly freezer inventory card for the Freezer Inventory integration.",preview:!1,documentationURL:"https://github.com/nikopol666/homeassistant-freezer-inventory"});const Nt={cs:{freezer_id:"Mrazák",name:"Název (nepovinné)",icon:"Ikona",display_mode:"Režim zobrazení",popup:"Dlaždice s popupem",list:"Přímý seznam",stats:"Statistiky",touch_mode:"Tabletový režim (větší prvky)",show_count:"Zobrazit počet položek",show_weight:"Zobrazovat hmotnost",show_note:"Zobrazovat poznámku",sort:"Řazení",oldest_first:"Od nejstarších",newest_first:"Od nejnovějších",old_months:"Zvýraznit starší než (měsíců)",language:"Jazyk karty",lang_auto:"Podle integrace",auto_close:"Automaticky zavřít po nečinnosti (sekundy, prázdné = vypnuto)",label_format:"Formát štítku",label_a4:"Arch A4 (88×36 mm)",label_action:"Tisk štítků",label_print:"Tisková fronta (běžná tiskárna / driver)",label_image:"Obrázek PNG pro aplikaci tiskárny (Niimbot…)"},en:{freezer_id:"Freezer",name:"Name (optional)",icon:"Icon",display_mode:"Display mode",popup:"Tile with popup",list:"Inline list",stats:"Statistics",touch_mode:"Tablet mode (larger elements)",show_count:"Show item count",show_weight:"Show weight",show_note:"Show note",sort:"Sorting",oldest_first:"Oldest first",newest_first:"Newest first",old_months:"Highlight older than (months)",language:"Card language",lang_auto:"Follow integration",auto_close:"Auto-close after inactivity (seconds, empty = off)",label_format:"Label format",label_a4:"A4 sheet (88×36 mm)",label_action:"Label printing",label_print:"Print queue (regular printer / driver)",label_image:"PNG image for a label-printer app (Niimbot…)"}};class Ot extends ae{constructor(){super(...arguments),this._config={type:""},this._freezers=[]}setConfig(e){this._config={...e}}connectedCallback(){super.connectedCallback(),Be(),this._loadFreezers()}async _loadFreezers(){if(this.hass)try{this._freezers=await Me(this.hass)}catch{this._freezers=[]}}get _t(){const e="cs"===this.hass?.locale?.language?"cs":"en";return Nt[e]}_update(e){this._config={...this._config,...e};for(const[e,t]of Object.entries(this._config))void 0===t&&delete this._config[e];be(this,"config-changed",{config:this._config})}render(){if(!this.hass)return W``;const e=this._t,t=this._config;return W`
      <div class="editor">
        <div class="field">
          <label>${e.freezer_id}</label>
          <select
            .value=${t.freezer_id??"main_freezer"}
            @change=${e=>this._update({freezer_id:e.target.value})}
          >
            ${(this._freezers.length?this._freezers:[{id:"main_freezer",name:"main_freezer"}]).map(e=>W`
                <option
                  value=${e.id}
                  ?selected=${(t.freezer_id??"main_freezer")===e.id}
                >
                  ${e.name}
                </option>
              `)}
          </select>
        </div>

        <div class="field">
          <label>${e.name}</label>
          <input
            type="text"
            .value=${t.name??""}
            @input=${e=>this._update({name:e.target.value||void 0})}
          />
        </div>

        <div class="field">
          <label>${e.icon}</label>
          <input
            type="text"
            placeholder="mdi:snowflake"
            .value=${t.icon??""}
            @input=${e=>this._update({icon:e.target.value||void 0})}
          />
        </div>

        <div class="field">
          <label>${e.display_mode}</label>
          <select
            .value=${t.display_mode??"popup"}
            @change=${e=>this._update({display_mode:e.target.value})}
          >
            <option value="popup" ?selected=${"popup"===(t.display_mode??"popup")}>
              ${e.popup}
            </option>
            <option value="list" ?selected=${"list"===t.display_mode}>
              ${e.list}
            </option>
            <option value="stats" ?selected=${"stats"===t.display_mode}>
              ${e.stats}
            </option>
          </select>
        </div>

        <div class="field">
          <label>${e.sort}</label>
          <select
            .value=${t.sort??"oldest_first"}
            @change=${e=>this._update({sort:e.target.value})}
          >
            <option
              value="oldest_first"
              ?selected=${"oldest_first"===(t.sort??"oldest_first")}
            >
              ${e.oldest_first}
            </option>
            <option value="newest_first" ?selected=${"newest_first"===t.sort}>
              ${e.newest_first}
            </option>
          </select>
        </div>

        <div class="field">
          <label>${e.old_months}</label>
          <input
            type="number"
            min="1"
            step="1"
            .value=${null!=t.old_months?String(t.old_months):""}
            @input=${e=>{const t=e.target.value.trim(),o=Number(t);this._update({old_months:t&&Number.isInteger(o)&&o>0?o:void 0})}}
          />
        </div>

        <div class="field">
          <label>${e.auto_close}</label>
          <input
            type="number"
            min="5"
            step="5"
            .value=${null!=t.auto_close?String(t.auto_close):""}
            @input=${e=>{const t=e.target.value.trim(),o=Number(t);this._update({auto_close:t&&Number.isFinite(o)&&o>0?Math.round(o):void 0})}}
          />
        </div>

        <div class="field">
          <label>${e.label_format}</label>
          <select
            .value=${t.label_format??"a4"}
            @change=${e=>{const t=e.target.value;this._update({label_format:"a4"===t?void 0:t})}}
          >
            <option value="a4" ?selected=${!t.label_format}>${e.label_a4}</option>
            ${["50x30","40x30","40x12","30x15"].map(e=>W`
                <option value=${e} ?selected=${t.label_format===e}>
                  ${e.replace("x"," × ")} mm
                </option>
              `)}
          </select>
        </div>

        <div class="field">
          <label>${e.label_action}</label>
          <select
            .value=${t.label_action??"print"}
            @change=${e=>{const t=e.target.value;this._update({label_action:"image"===t?"image":void 0})}}
          >
            <option value="print" ?selected=${"image"!==t.label_action}>
              ${e.label_print}
            </option>
            <option value="image" ?selected=${"image"===t.label_action}>
              ${e.label_image}
            </option>
          </select>
        </div>

        <div class="field">
          <label>${e.language}</label>
          <select
            .value=${t.language??""}
            @change=${e=>{const t=e.target.value;this._update({language:t||void 0})}}
          >
            <option value="" ?selected=${!t.language}>${e.lang_auto}</option>
            <option value="cs" ?selected=${"cs"===t.language}>Čeština</option>
            <option value="en" ?selected=${"en"===t.language}>English</option>
          </select>
        </div>

        ${[["touch_mode",e.touch_mode],["show_count",e.show_count],["show_weight",e.show_weight],["show_note",e.show_note]].map(([e,t])=>W`
            <label class="toggle-row">
              <input
                type="checkbox"
                .checked=${!1!==this._config[e]}
                @change=${t=>this._update({[e]:!!t.target.checked&&void 0})}
              />
              ${t}
            </label>
          `)}
      </div>
    `}static{this.styles=n`
    .editor {
      display: flex;
      flex-direction: column;
      padding: 4px 0;
    }

    .field {
      display: flex;
      flex-direction: column;
      gap: 4px;
      margin-bottom: 14px;
    }

    label {
      font-size: 13px;
      font-weight: 600;
      color: var(--secondary-text-color);
    }

    input,
    select {
      font: inherit;
      color: var(--primary-text-color);
      background: var(--card-background-color, #fff);
      border: 1px solid var(--divider-color, rgba(0, 0, 0, 0.12));
      border-radius: 8px;
      min-height: 40px;
      padding: 8px 12px;
    }

    .toggle-row {
      display: flex;
      align-items: center;
      gap: 10px;
      min-height: 40px;
      font-size: 14px;
      color: var(--primary-text-color);
      cursor: pointer;
    }

    .toggle-row input {
      width: 18px;
      height: 18px;
      min-height: 0;
    }
  `}}e([ue({attribute:!1})],Ot.prototype,"hass",void 0),e([he()],Ot.prototype,"_config",void 0),e([he()],Ot.prototype,"_freezers",void 0),customElements.define("freezer-inventory-card-editor",Ot);var Dt=Object.freeze({__proto__:null});
