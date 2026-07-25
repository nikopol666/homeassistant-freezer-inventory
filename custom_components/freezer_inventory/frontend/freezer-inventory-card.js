function t(t,e,i,o){var s,n=arguments.length,r=n<3?e:null===o?o=Object.getOwnPropertyDescriptor(e,i):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)r=Reflect.decorate(t,e,i,o);else for(var a=t.length-1;a>=0;a--)(s=t[a])&&(r=(n<3?s(r):n>3?s(e,i,r):s(e,i))||r);return n>3&&r&&Object.defineProperty(e,i,r),r}"function"==typeof SuppressedError&&SuppressedError;const e=globalThis,i=e.ShadowRoot&&(void 0===e.ShadyCSS||e.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,o=Symbol(),s=new WeakMap;let n=class{constructor(t,e,i){if(this._$cssResult$=!0,i!==o)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=e}get styleSheet(){let t=this.o;const e=this.t;if(i&&void 0===t){const i=void 0!==e&&1===e.length;i&&(t=s.get(e)),void 0===t&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),i&&s.set(e,t))}return t}toString(){return this.cssText}};const r=(t,...e)=>{const i=1===t.length?t[0]:e.reduce((e,i,o)=>e+(t=>{if(!0===t._$cssResult$)return t.cssText;if("number"==typeof t)return t;throw Error("Value passed to 'css' function must be a 'css' function result: "+t+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(i)+t[o+1],t[0]);return new n(i,t,o)},a=i?t=>t:t=>t instanceof CSSStyleSheet?(t=>{let e="";for(const i of t.cssRules)e+=i.cssText;return(t=>new n("string"==typeof t?t:t+"",void 0,o))(e)})(t):t,{is:l,defineProperty:c,getOwnPropertyDescriptor:h,getOwnPropertyNames:d,getOwnPropertySymbols:u,getPrototypeOf:p}=Object,_=globalThis,f=_.trustedTypes,g=f?f.emptyScript:"",m=_.reactiveElementPolyfillSupport,v=(t,e)=>t,b={toAttribute(t,e){switch(e){case Boolean:t=t?g:null;break;case Object:case Array:t=null==t?t:JSON.stringify(t)}return t},fromAttribute(t,e){let i=t;switch(e){case Boolean:i=null!==t;break;case Number:i=null===t?null:Number(t);break;case Object:case Array:try{i=JSON.parse(t)}catch(t){i=null}}return i}},y=(t,e)=>!l(t,e),$={attribute:!0,type:String,converter:b,reflect:!1,useDefault:!1,hasChanged:y};Symbol.metadata??=Symbol("metadata"),_.litPropertyMetadata??=new WeakMap;let w=class extends HTMLElement{static addInitializer(t){this._$Ei(),(this.l??=[]).push(t)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(t,e=$){if(e.state&&(e.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(t)&&((e=Object.create(e)).wrapped=!0),this.elementProperties.set(t,e),!e.noAccessor){const i=Symbol(),o=this.getPropertyDescriptor(t,i,e);void 0!==o&&c(this.prototype,t,o)}}static getPropertyDescriptor(t,e,i){const{get:o,set:s}=h(this.prototype,t)??{get(){return this[e]},set(t){this[e]=t}};return{get:o,set(e){const n=o?.call(this);s?.call(this,e),this.requestUpdate(t,n,i)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)??$}static _$Ei(){if(this.hasOwnProperty(v("elementProperties")))return;const t=p(this);t.finalize(),void 0!==t.l&&(this.l=[...t.l]),this.elementProperties=new Map(t.elementProperties)}static finalize(){if(this.hasOwnProperty(v("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(v("properties"))){const t=this.properties,e=[...d(t),...u(t)];for(const i of e)this.createProperty(i,t[i])}const t=this[Symbol.metadata];if(null!==t){const e=litPropertyMetadata.get(t);if(void 0!==e)for(const[t,i]of e)this.elementProperties.set(t,i)}this._$Eh=new Map;for(const[t,e]of this.elementProperties){const i=this._$Eu(t,e);void 0!==i&&this._$Eh.set(i,t)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(t){const e=[];if(Array.isArray(t)){const i=new Set(t.flat(1/0).reverse());for(const t of i)e.unshift(a(t))}else void 0!==t&&e.push(a(t));return e}static _$Eu(t,e){const i=e.attribute;return!1===i?void 0:"string"==typeof i?i:"string"==typeof t?t.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(t=>this.enableUpdating=t),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(t=>t(this))}addController(t){(this._$EO??=new Set).add(t),void 0!==this.renderRoot&&this.isConnected&&t.hostConnected?.()}removeController(t){this._$EO?.delete(t)}_$E_(){const t=new Map,e=this.constructor.elementProperties;for(const i of e.keys())this.hasOwnProperty(i)&&(t.set(i,this[i]),delete this[i]);t.size>0&&(this._$Ep=t)}createRenderRoot(){const t=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return((t,o)=>{if(i)t.adoptedStyleSheets=o.map(t=>t instanceof CSSStyleSheet?t:t.styleSheet);else for(const i of o){const o=document.createElement("style"),s=e.litNonce;void 0!==s&&o.setAttribute("nonce",s),o.textContent=i.cssText,t.appendChild(o)}})(t,this.constructor.elementStyles),t}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(t=>t.hostConnected?.())}enableUpdating(t){}disconnectedCallback(){this._$EO?.forEach(t=>t.hostDisconnected?.())}attributeChangedCallback(t,e,i){this._$AK(t,i)}_$ET(t,e){const i=this.constructor.elementProperties.get(t),o=this.constructor._$Eu(t,i);if(void 0!==o&&!0===i.reflect){const s=(void 0!==i.converter?.toAttribute?i.converter:b).toAttribute(e,i.type);this._$Em=t,null==s?this.removeAttribute(o):this.setAttribute(o,s),this._$Em=null}}_$AK(t,e){const i=this.constructor,o=i._$Eh.get(t);if(void 0!==o&&this._$Em!==o){const t=i.getPropertyOptions(o),s="function"==typeof t.converter?{fromAttribute:t.converter}:void 0!==t.converter?.fromAttribute?t.converter:b;this._$Em=o;const n=s.fromAttribute(e,t.type);this[o]=n??this._$Ej?.get(o)??n,this._$Em=null}}requestUpdate(t,e,i,o=!1,s){if(void 0!==t){const n=this.constructor;if(!1===o&&(s=this[t]),i??=n.getPropertyOptions(t),!((i.hasChanged??y)(s,e)||i.useDefault&&i.reflect&&s===this._$Ej?.get(t)&&!this.hasAttribute(n._$Eu(t,i))))return;this.C(t,e,i)}!1===this.isUpdatePending&&(this._$ES=this._$EP())}C(t,e,{useDefault:i,reflect:o,wrapped:s},n){i&&!(this._$Ej??=new Map).has(t)&&(this._$Ej.set(t,n??e??this[t]),!0!==s||void 0!==n)||(this._$AL.has(t)||(this.hasUpdated||i||(e=void 0),this._$AL.set(t,e)),!0===o&&this._$Em!==t&&(this._$Eq??=new Set).add(t))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(t){Promise.reject(t)}const t=this.scheduleUpdate();return null!=t&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(const[t,e]of this._$Ep)this[t]=e;this._$Ep=void 0}const t=this.constructor.elementProperties;if(t.size>0)for(const[e,i]of t){const{wrapped:t}=i,o=this[e];!0!==t||this._$AL.has(e)||void 0===o||this.C(e,void 0,i,o)}}let t=!1;const e=this._$AL;try{t=this.shouldUpdate(e),t?(this.willUpdate(e),this._$EO?.forEach(t=>t.hostUpdate?.()),this.update(e)):this._$EM()}catch(e){throw t=!1,this._$EM(),e}t&&this._$AE(e)}willUpdate(t){}_$AE(t){this._$EO?.forEach(t=>t.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(t){return!0}update(t){this._$Eq&&=this._$Eq.forEach(t=>this._$ET(t,this[t])),this._$EM()}updated(t){}firstUpdated(t){}};w.elementStyles=[],w.shadowRootOptions={mode:"open"},w[v("elementProperties")]=new Map,w[v("finalized")]=new Map,m?.({ReactiveElement:w}),(_.reactiveElementVersions??=[]).push("2.1.2");const x=globalThis,k=t=>t,z=x.trustedTypes,A=z?z.createPolicy("lit-html",{createHTML:t=>t}):void 0,E="$lit$",S=`lit$${Math.random().toFixed(9).slice(2)}$`,C="?"+S,T=`<${C}>`,P=document,M=()=>P.createComment(""),I=t=>null===t||"object"!=typeof t&&"function"!=typeof t,O=Array.isArray,D="[ \t\n\f\r]",N=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,L=/-->/g,R=/>/g,B=RegExp(`>|${D}(?:([^\\s"'>=/]+)(${D}*=${D}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`,"g"),j=/'/g,W=/"/g,U=/^(?:script|style|textarea|title)$/i,q=(t=>(e,...i)=>({_$litType$:t,strings:e,values:i}))(1),F=Symbol.for("lit-noChange"),H=Symbol.for("lit-nothing"),V=new WeakMap,Z=P.createTreeWalker(P,129);function Q(t,e){if(!O(t)||!t.hasOwnProperty("raw"))throw Error("invalid template strings array");return void 0!==A?A.createHTML(e):e}const Y=(t,e)=>{const i=t.length-1,o=[];let s,n=2===e?"<svg>":3===e?"<math>":"",r=N;for(let e=0;e<i;e++){const i=t[e];let a,l,c=-1,h=0;for(;h<i.length&&(r.lastIndex=h,l=r.exec(i),null!==l);)h=r.lastIndex,r===N?"!--"===l[1]?r=L:void 0!==l[1]?r=R:void 0!==l[2]?(U.test(l[2])&&(s=RegExp("</"+l[2],"g")),r=B):void 0!==l[3]&&(r=B):r===B?">"===l[0]?(r=s??N,c=-1):void 0===l[1]?c=-2:(c=r.lastIndex-l[2].length,a=l[1],r=void 0===l[3]?B:'"'===l[3]?W:j):r===W||r===j?r=B:r===L||r===R?r=N:(r=B,s=void 0);const d=r===B&&t[e+1].startsWith("/>")?" ":"";n+=r===N?i+T:c>=0?(o.push(a),i.slice(0,c)+E+i.slice(c)+S+d):i+S+(-2===c?e:d)}return[Q(t,n+(t[i]||"<?>")+(2===e?"</svg>":3===e?"</math>":"")),o]};class K{constructor({strings:t,_$litType$:e},i){let o;this.parts=[];let s=0,n=0;const r=t.length-1,a=this.parts,[l,c]=Y(t,e);if(this.el=K.createElement(l,i),Z.currentNode=this.el.content,2===e||3===e){const t=this.el.content.firstChild;t.replaceWith(...t.childNodes)}for(;null!==(o=Z.nextNode())&&a.length<r;){if(1===o.nodeType){if(o.hasAttributes())for(const t of o.getAttributeNames())if(t.endsWith(E)){const e=c[n++],i=o.getAttribute(t).split(S),r=/([.?@])?(.*)/.exec(e);a.push({type:1,index:s,name:r[2],strings:i,ctor:"."===r[1]?et:"?"===r[1]?it:"@"===r[1]?ot:tt}),o.removeAttribute(t)}else t.startsWith(S)&&(a.push({type:6,index:s}),o.removeAttribute(t));if(U.test(o.tagName)){const t=o.textContent.split(S),e=t.length-1;if(e>0){o.textContent=z?z.emptyScript:"";for(let i=0;i<e;i++)o.append(t[i],M()),Z.nextNode(),a.push({type:2,index:++s});o.append(t[e],M())}}}else if(8===o.nodeType)if(o.data===C)a.push({type:2,index:s});else{let t=-1;for(;-1!==(t=o.data.indexOf(S,t+1));)a.push({type:7,index:s}),t+=S.length-1}s++}}static createElement(t,e){const i=P.createElement("template");return i.innerHTML=t,i}}function J(t,e,i=t,o){if(e===F)return e;let s=void 0!==o?i._$Co?.[o]:i._$Cl;const n=I(e)?void 0:e._$litDirective$;return s?.constructor!==n&&(s?._$AO?.(!1),void 0===n?s=void 0:(s=new n(t),s._$AT(t,i,o)),void 0!==o?(i._$Co??=[])[o]=s:i._$Cl=s),void 0!==s&&(e=J(t,s._$AS(t,e.values),s,o)),e}class G{constructor(t,e){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){const{el:{content:e},parts:i}=this._$AD,o=(t?.creationScope??P).importNode(e,!0);Z.currentNode=o;let s=Z.nextNode(),n=0,r=0,a=i[0];for(;void 0!==a;){if(n===a.index){let e;2===a.type?e=new X(s,s.nextSibling,this,t):1===a.type?e=new a.ctor(s,a.name,a.strings,this,t):6===a.type&&(e=new st(s,this,t)),this._$AV.push(e),a=i[++r]}n!==a?.index&&(s=Z.nextNode(),n++)}return Z.currentNode=P,o}p(t){let e=0;for(const i of this._$AV)void 0!==i&&(void 0!==i.strings?(i._$AI(t,i,e),e+=i.strings.length-2):i._$AI(t[e])),e++}}class X{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(t,e,i,o){this.type=2,this._$AH=H,this._$AN=void 0,this._$AA=t,this._$AB=e,this._$AM=i,this.options=o,this._$Cv=o?.isConnected??!0}get parentNode(){let t=this._$AA.parentNode;const e=this._$AM;return void 0!==e&&11===t?.nodeType&&(t=e.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,e=this){t=J(this,t,e),I(t)?t===H||null==t||""===t?(this._$AH!==H&&this._$AR(),this._$AH=H):t!==this._$AH&&t!==F&&this._(t):void 0!==t._$litType$?this.$(t):void 0!==t.nodeType?this.T(t):(t=>O(t)||"function"==typeof t?.[Symbol.iterator])(t)?this.k(t):this._(t)}O(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t))}_(t){this._$AH!==H&&I(this._$AH)?this._$AA.nextSibling.data=t:this.T(P.createTextNode(t)),this._$AH=t}$(t){const{values:e,_$litType$:i}=t,o="number"==typeof i?this._$AC(t):(void 0===i.el&&(i.el=K.createElement(Q(i.h,i.h[0]),this.options)),i);if(this._$AH?._$AD===o)this._$AH.p(e);else{const t=new G(o,this),i=t.u(this.options);t.p(e),this.T(i),this._$AH=t}}_$AC(t){let e=V.get(t.strings);return void 0===e&&V.set(t.strings,e=new K(t)),e}k(t){O(this._$AH)||(this._$AH=[],this._$AR());const e=this._$AH;let i,o=0;for(const s of t)o===e.length?e.push(i=new X(this.O(M()),this.O(M()),this,this.options)):i=e[o],i._$AI(s),o++;o<e.length&&(this._$AR(i&&i._$AB.nextSibling,o),e.length=o)}_$AR(t=this._$AA.nextSibling,e){for(this._$AP?.(!1,!0,e);t!==this._$AB;){const e=k(t).nextSibling;k(t).remove(),t=e}}setConnected(t){void 0===this._$AM&&(this._$Cv=t,this._$AP?.(t))}}class tt{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,e,i,o,s){this.type=1,this._$AH=H,this._$AN=void 0,this.element=t,this.name=e,this._$AM=o,this.options=s,i.length>2||""!==i[0]||""!==i[1]?(this._$AH=Array(i.length-1).fill(new String),this.strings=i):this._$AH=H}_$AI(t,e=this,i,o){const s=this.strings;let n=!1;if(void 0===s)t=J(this,t,e,0),n=!I(t)||t!==this._$AH&&t!==F,n&&(this._$AH=t);else{const o=t;let r,a;for(t=s[0],r=0;r<s.length-1;r++)a=J(this,o[i+r],e,r),a===F&&(a=this._$AH[r]),n||=!I(a)||a!==this._$AH[r],a===H?t=H:t!==H&&(t+=(a??"")+s[r+1]),this._$AH[r]=a}n&&!o&&this.j(t)}j(t){t===H?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}}class et extends tt{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===H?void 0:t}}class it extends tt{constructor(){super(...arguments),this.type=4}j(t){this.element.toggleAttribute(this.name,!!t&&t!==H)}}class ot extends tt{constructor(t,e,i,o,s){super(t,e,i,o,s),this.type=5}_$AI(t,e=this){if((t=J(this,t,e,0)??H)===F)return;const i=this._$AH,o=t===H&&i!==H||t.capture!==i.capture||t.once!==i.once||t.passive!==i.passive,s=t!==H&&(i===H||o);o&&this.element.removeEventListener(this.name,this,i),s&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){"function"==typeof this._$AH?this._$AH.call(this.options?.host??this.element,t):this._$AH.handleEvent(t)}}class st{constructor(t,e,i){this.element=t,this.type=6,this._$AN=void 0,this._$AM=e,this.options=i}get _$AU(){return this._$AM._$AU}_$AI(t){J(this,t)}}const nt=x.litHtmlPolyfillSupport;nt?.(K,X),(x.litHtmlVersions??=[]).push("3.3.3");const rt=globalThis;let at=class extends w{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){const t=super.createRenderRoot();return this.renderOptions.renderBefore??=t.firstChild,t}update(t){const e=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=((t,e,i)=>{const o=i?.renderBefore??e;let s=o._$litPart$;if(void 0===s){const t=i?.renderBefore??null;o._$litPart$=s=new X(e.insertBefore(M(),t),t,void 0,i??{})}return s._$AI(t),s})(e,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return F}};at._$litElement$=!0,at.finalized=!0,rt.litElementHydrateSupport?.({LitElement:at});const lt=rt.litElementPolyfillSupport;lt?.({LitElement:at}),(rt.litElementVersions??=[]).push("4.2.2");const ct={attribute:!0,type:String,converter:b,reflect:!1,hasChanged:y},ht=(t=ct,e,i)=>{const{kind:o,metadata:s}=i;let n=globalThis.litPropertyMetadata.get(s);if(void 0===n&&globalThis.litPropertyMetadata.set(s,n=new Map),"setter"===o&&((t=Object.create(t)).wrapped=!0),n.set(i.name,t),"accessor"===o){const{name:o}=i;return{set(i){const s=e.get.call(this);e.set.call(this,i),this.requestUpdate(o,s,t,!0,i)},init(e){return void 0!==e&&this.C(o,void 0,t,e),e}}}if("setter"===o){const{name:o}=i;return function(i){const s=this[o];e.call(this,i),this.requestUpdate(o,s,t,!0,i)}}throw Error("Unsupported decorator location: "+o)};function dt(t){return(e,i)=>"object"==typeof i?ht(t,e,i):((t,e,i)=>{const o=e.hasOwnProperty(i);return e.constructor.createProperty(i,t),o?Object.getOwnPropertyDescriptor(e,i):void 0})(t,e,i)}function ut(t){return dt({...t,state:!0,attribute:!1})}const pt={items_one:"{count} item",items_few:"{count} items",items_many:"{count} items",empty_freezer:"The freezer is empty.",add_first_item:"+ ADD FIRST ITEM",add:"+ ADD",all:"All",uncategorized:"Other",no_weight:"no weight set",pieces_short:"pcs",pieces_field:"Pieces per package",months_old:"{months} mo.",manage:"Manage products",close:"Close",back:"Back",what_to_add:"What do you want to add?",other_product:"Other…",custom_product_name:"Product name",add_product_title:"Add: {name}",edit_item_title:"Edit item",product:"Product",weight:"Weight",original_weight:"Original weight",optional:"optional",month:"Month",year:"Year",note:"Note",quantity:"Number of packages",add_to_freezer:"ADD TO FREEZER",save:"SAVE",cancel:"CANCEL",confirm:"CONFIRM",added_confirmation:"Added to the freezer:",weight_zero_remove:"Weight is 0. Do you want to remove the item?",remove_item_btn:"REMOVE ITEM",err_name_required:"Enter a product name.",err_invalid_weight:"The weight must be a positive number.",err_invalid_month:"The month is not valid.",err_invalid_year:"The year is not valid.",err_invalid_amount:"The amount must be a positive number.",err_amount_too_big:"Cannot remove {amount} g. Only {weight} g left.",err_invalid_pieces:"The number of pieces must be a positive number.",err_pieces_too_big:"Cannot remove {pieces} pcs. Only {count} pcs left.",err_nothing_to_remove:"Enter a weight or a number of pieces.",err_generic:"The action failed.",err_add_failed:"The item could not be added.",err_item_gone:"The item no longer exists. The list was refreshed.",remove_question:"Remove {label}?",note_label:"Note:",remove_all:"REMOVE ALL",remove_half:"REMOVE HALF – {half} g",remove_half_pieces:"REMOVE HALF – {half} pcs",remove_amount:"ENTER AMOUNT",edit:"EDIT",how_much_remove:"How much do you want to remove?",currently_in_freezer:"Currently in the freezer:",remaining_after:"Remaining after removal:",item_removed:"The item was removed.",item_updated:"The item was updated.",undo:"UNDO",categories:"Categories",products:"Products",add_category:"Add category",add_product_btn:"Add product",name:"Name",icon:"Icon",color:"Color",category:"Category",no_category:"No category",default_weight:"Default weight",quick_weights:"Quick weight choices (g, comma separated)",quick_pieces:"Quick piece choices (comma separated)",ask_for_weight:"Show weight field",enabled:"Visible",max_months:"Recommended storage time (months)",delete:"Delete",restore_defaults:"Restore default products",restore_defaults_confirm:"Restore the default products and categories? Items in the freezer stay untouched.",delete_category_confirm:"Delete category {name}? Its products will keep working without a category.",delete_product_confirm:"Delete product {name}?",move_up:"Move up",move_down:"Move down",move:"MOVE",move_where:"Move to which freezer?",item_moved:"The item was moved to: {name}",print_label:"PRINT LABEL",print_all_labels:"Print labels for all items",scan_title:"Scan a label",scan_hint:"Point the camera at the QR code on the package.",scan_unsupported:"QR scanning is not supported in this browser.",scan_camera_denied:"Could not start the camera. Check permissions.",scan_not_found:"The scanned item is not in this freezer.",scan_button:"Scan a label",stats_items:"Items",stats_weight:"Total",stats_avg_age:"Average age",stats_oldest:"Oldest",stats_by_category:"By category",stats_monthly:"Monthly overview",stats_added:"Added",stats_removed:"Removed",month_1:"January",month_2:"February",month_3:"March",month_4:"April",month_5:"May",month_6:"June",month_7:"July",month_8:"August",month_9:"September",month_10:"October",month_11:"November",month_12:"December"},_t={cs:{items_one:"{count} položka",items_few:"{count} položky",items_many:"{count} položek",empty_freezer:"Mrazák je prázdný.",add_first_item:"+ PŘIDAT PRVNÍ POLOŽKU",add:"+ PŘIDAT",all:"Vše",uncategorized:"Ostatní",no_weight:"hmotnost neuvedena",pieces_short:"ks",pieces_field:"Kusy v balíčku",months_old:"{months} měs.",manage:"Správa produktů",close:"Zavřít",back:"Zpět",what_to_add:"Co chcete přidat?",other_product:"Jiné…",custom_product_name:"Název produktu",add_product_title:"Přidat: {name}",edit_item_title:"Upravit položku",product:"Produkt",weight:"Hmotnost",original_weight:"Původní hmotnost",optional:"nepovinné",month:"Měsíc",year:"Rok",note:"Poznámka",quantity:"Počet balíčků",add_to_freezer:"PŘIDAT DO MRAZÁKU",save:"ULOŽIT",cancel:"ZRUŠIT",confirm:"POTVRDIT",added_confirmation:"Přidáno do mrazáku:",weight_zero_remove:"Hmotnost je 0. Chcete položku odstranit?",remove_item_btn:"ODSTRANIT POLOŽKU",err_name_required:"Zadejte název produktu.",err_invalid_weight:"Hmotnost musí být kladné číslo.",err_invalid_month:"Zadaný měsíc není platný.",err_invalid_year:"Zadaný rok není platný.",err_invalid_amount:"Množství musí být kladné číslo.",err_amount_too_big:"Nelze vyjmout {amount} g. V mrazáku zbývá pouze {weight} g.",err_invalid_pieces:"Počet kusů musí být kladné číslo.",err_pieces_too_big:"Nelze vyjmout {pieces} ks. Zbývá pouze {count} ks.",err_nothing_to_remove:"Zadejte hmotnost nebo počet kusů.",err_generic:"Akce se nepodařila.",err_add_failed:"Položku se nepodařilo přidat.",err_item_gone:"Položka už neexistuje. Seznam byl aktualizován.",remove_question:"Vyjmout {label}?",note_label:"Poznámka:",remove_all:"VYJMOUT CELÉ",remove_half:"VYJMOUT POLOVINU – {half} g",remove_half_pieces:"VYJMOUT POLOVINU – {half} ks",remove_amount:"ZADAT MNOŽSTVÍ",edit:"UPRAVIT",how_much_remove:"Kolik chcete vyjmout?",currently_in_freezer:"Aktuálně v mrazáku:",remaining_after:"Po vyjmutí zůstane:",item_removed:"Položka byla vyjmuta.",item_updated:"Položka byla upravena.",undo:"VRÁTIT ZPĚT",categories:"Kategorie",products:"Produkty",add_category:"Přidat kategorii",add_product_btn:"Přidat produkt",name:"Název",icon:"Ikona",color:"Barva",category:"Kategorie",no_category:"Bez kategorie",default_weight:"Výchozí hmotnost",quick_weights:"Rychlé volby hmotnosti (g, oddělené čárkou)",quick_pieces:"Rychlé volby kusů (oddělené čárkou)",ask_for_weight:"Zobrazovat pole hmotnosti",enabled:"Zobrazovat",max_months:"Doporučená doba skladování (měsíce)",delete:"Smazat",restore_defaults:"Obnovit výchozí produkty",restore_defaults_confirm:"Obnovit výchozí nabídku produktů a kategorií? Položky v mrazáku zůstanou beze změny.",delete_category_confirm:"Smazat kategorii {name}? Produkty v ní zůstanou bez kategorie.",delete_product_confirm:"Smazat produkt {name}?",move_up:"Posunout nahoru",move_down:"Posunout dolů",move:"PŘESUNOUT",move_where:"Kam přesunout?",item_moved:"Položka byla přesunuta do: {name}",print_label:"VYTISKNOUT ŠTÍTEK",print_all_labels:"Tisk štítků všech položek",scan_title:"Naskenujte štítek",scan_hint:"Namiřte kameru na QR kód na balíčku.",scan_unsupported:"Skenování QR kódů není v tomto prohlížeči podporováno.",scan_camera_denied:"Kameru se nepodařilo spustit. Zkontrolujte oprávnění.",scan_not_found:"Naskenovaná položka v tomto mrazáku není.",scan_button:"Naskenovat štítek",stats_items:"Položek",stats_weight:"Celkem",stats_avg_age:"Průměrné stáří",stats_oldest:"Nejstarší",stats_by_category:"Podle kategorií",stats_monthly:"Měsíční přehled",stats_added:"Přidáno",stats_removed:"Vyjmuto",month_1:"Leden",month_2:"Únor",month_3:"Březen",month_4:"Duben",month_5:"Květen",month_6:"Červen",month_7:"Červenec",month_8:"Srpen",month_9:"Září",month_10:"Říjen",month_11:"Listopad",month_12:"Prosinec"},en:pt};function ft(t,e){let i="items_many";return 1===e?i="items_one":e>=2&&e<=4&&(i="items_few"),t(i,{count:e})}function gt(t){return`${String(t.month).padStart(2,"0")}/${t.year}`}function mt(t,e){const i=[t.product_name,gt(t)];return null!=t.weight&&i.push(`${t.weight} ${t.unit||"g"}`),null!=t.pieces&&i.push(`${t.pieces} ${e?e("pieces_short"):"ks"}`),i.join(" · ")}function vt(t,e=new Date){return 12*(e.getFullYear()-t.year)+(e.getMonth()+1-t.month)}function bt(t,e="mdi:food"){const i=t||e;return i.startsWith("mdi:")?q`<ha-icon icon=${i}></ha-icon>`:q`<span class="emoji-icon" aria-hidden="true">${i}</span>`}function yt(t){return t?`--fi-avatar-color:${t}`:""}function $t(t,e,i){t.dispatchEvent(new CustomEvent(e,{detail:i,bubbles:!0,composed:!0}))}let wt=!1;async function xt(){if(wt)return;if(wt=!0,customElements.get("ha-dialog")&&customElements.get("ha-form")&&customElements.get("ha-icon"))return;const t=window.loadCardHelpers;try{t&&await t();const e=customElements.get("hui-button-card");e?.getConfigElement?.();const i=customElements.get("hui-entities-card");i?.getConfigElement?.(),await Promise.race([customElements.whenDefined("ha-dialog"),new Promise(t=>setTimeout(t,2e3))])}catch{}}const kt=r`
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
`,zt="freezer_inventory";async function At(t){return t.callWS({type:`${zt}/get_config`})}async function Et(t){return(await t.callWS({type:`${zt}/get_products`})).products}async function St(t){return(await t.callWS({type:`${zt}/get_categories`})).categories}async function Ct(t){return(await t.callWS({type:`${zt}/get_freezers`})).freezers}async function Tt(t,e){return t.callWS({type:`${zt}/get_stats`,...e?{freezer_id:e}:{}})}async function Pt(t,e,i,o){await t.callService(zt,"update_item",{freezer_id:e,item_id:i,...o})}function Mt(t,e){if(t&&"object"==typeof t&&"message"in t){const e=t.message;if("string"==typeof e&&e)return e}return e}const It=function(t,e){let i=t;const o=Rt[e];let s=null,n=0,r=null;const a=[],l={},c=function(t,e){n=4*i+17,s=function(t){const e=new Array(t);for(let i=0;i<t;i+=1){e[i]=new Array(t);for(let o=0;o<t;o+=1)e[i][o]=null}return e}(n),h(0,0),h(n-7,0),h(0,n-7),u(),d(),_(t,e),i>=7&&p(t),null==r&&(r=g(i,o,a)),f(r,e)},h=function(t,e){for(let i=-1;i<=7;i+=1)if(!(t+i<=-1||n<=t+i))for(let o=-1;o<=7;o+=1)e+o<=-1||n<=e+o||(s[t+i][e+o]=0<=i&&i<=6&&(0==o||6==o)||0<=o&&o<=6&&(0==i||6==i)||2<=i&&i<=4&&2<=o&&o<=4)},d=function(){for(let t=8;t<n-8;t+=1)null==s[t][6]&&(s[t][6]=t%2==0);for(let t=8;t<n-8;t+=1)null==s[6][t]&&(s[6][t]=t%2==0)},u=function(){const t=Zt.getPatternPosition(i);for(let e=0;e<t.length;e+=1)for(let i=0;i<t.length;i+=1){const o=t[e],n=t[i];if(null==s[o][n])for(let t=-2;t<=2;t+=1)for(let e=-2;e<=2;e+=1)s[o+t][n+e]=-2==t||2==t||-2==e||2==e||0==t&&0==e}},p=function(t){const e=Zt.getBCHTypeNumber(i);for(let i=0;i<18;i+=1){const o=!t&&1==(e>>i&1);s[Math.floor(i/3)][i%3+n-8-3]=o}for(let i=0;i<18;i+=1){const o=!t&&1==(e>>i&1);s[i%3+n-8-3][Math.floor(i/3)]=o}},_=function(t,e){const i=o<<3|e,r=Zt.getBCHTypeInfo(i);for(let e=0;e<15;e+=1){const i=!t&&1==(r>>e&1);e<6?s[e][8]=i:e<8?s[e+1][8]=i:s[n-15+e][8]=i}for(let e=0;e<15;e+=1){const i=!t&&1==(r>>e&1);e<8?s[8][n-e-1]=i:e<9?s[8][15-e-1+1]=i:s[8][15-e-1]=i}s[n-8][8]=!t},f=function(t,e){let i=-1,o=n-1,r=7,a=0;const l=Zt.getMaskFunction(e);for(let e=n-1;e>0;e-=2)for(6==e&&(e-=1);;){for(let i=0;i<2;i+=1)if(null==s[o][e-i]){let n=!1;a<t.length&&(n=1==(t[a]>>>r&1));l(o,e-i)&&(n=!n),s[o][e-i]=n,r-=1,-1==r&&(a+=1,r=7)}if(o+=i,o<0||n<=o){o-=i,i=-i;break}}},g=function(t,e,i){const o=Kt.getRSBlocks(t,e),s=Jt();for(let e=0;e<i.length;e+=1){const o=i[e];s.put(o.getMode(),4),s.put(o.getLength(),Zt.getLengthInBits(o.getMode(),t)),o.write(s)}let n=0;for(let t=0;t<o.length;t+=1)n+=o[t].dataCount;if(s.getLengthInBits()>8*n)throw"code length overflow. ("+s.getLengthInBits()+">"+8*n+")";for(s.getLengthInBits()+4<=8*n&&s.put(0,4);s.getLengthInBits()%8!=0;)s.putBit(!1);for(;!(s.getLengthInBits()>=8*n||(s.put(236,8),s.getLengthInBits()>=8*n));)s.put(17,8);return function(t,e){let i=0,o=0,s=0;const n=new Array(e.length),r=new Array(e.length);for(let a=0;a<e.length;a+=1){const l=e[a].dataCount,c=e[a].totalCount-l;o=Math.max(o,l),s=Math.max(s,c),n[a]=new Array(l);for(let e=0;e<n[a].length;e+=1)n[a][e]=255&t.getBuffer()[e+i];i+=l;const h=Zt.getErrorCorrectPolynomial(c),d=Yt(n[a],h.getLength()-1).mod(h);r[a]=new Array(h.getLength()-1);for(let t=0;t<r[a].length;t+=1){const e=t+d.getLength()-r[a].length;r[a][t]=e>=0?d.getAt(e):0}}let a=0;for(let t=0;t<e.length;t+=1)a+=e[t].totalCount;const l=new Array(a);let c=0;for(let t=0;t<o;t+=1)for(let i=0;i<e.length;i+=1)t<n[i].length&&(l[c]=n[i][t],c+=1);for(let t=0;t<s;t+=1)for(let i=0;i<e.length;i+=1)t<r[i].length&&(l[c]=r[i][t],c+=1);return l}(s,o)};l.addData=function(t,e){let i=null;switch(e=e||"Byte"){case"Numeric":i=Gt(t);break;case"Alphanumeric":i=Xt(t);break;case"Byte":i=te(t);break;case"Kanji":i=ee(t);break;default:throw"mode:"+e}a.push(i),r=null},l.isDark=function(t,e){if(t<0||n<=t||e<0||n<=e)throw t+","+e;return s[t][e]},l.getModuleCount=function(){return n},l.make=function(){if(i<1){let t=1;for(;t<40;t++){const e=Kt.getRSBlocks(t,o),i=Jt();for(let e=0;e<a.length;e++){const o=a[e];i.put(o.getMode(),4),i.put(o.getLength(),Zt.getLengthInBits(o.getMode(),t)),o.write(i)}let s=0;for(let t=0;t<e.length;t++)s+=e[t].dataCount;if(i.getLengthInBits()<=8*s)break}i=t}c(!1,function(){let t=0,e=0;for(let i=0;i<8;i+=1){c(!0,i);const o=Zt.getLostPoint(l);(0==i||t>o)&&(t=o,e=i)}return e}())},l.createTableTag=function(t,e){t=t||2;let i="";i+='<table style="',i+=" border-width: 0px; border-style: none;",i+=" border-collapse: collapse;",i+=" padding: 0px; margin: "+(e=void 0===e?4*t:e)+"px;",i+='">',i+="<tbody>";for(let e=0;e<l.getModuleCount();e+=1){i+="<tr>";for(let o=0;o<l.getModuleCount();o+=1)i+='<td style="',i+=" border-width: 0px; border-style: none;",i+=" border-collapse: collapse;",i+=" padding: 0px; margin: 0px;",i+=" width: "+t+"px;",i+=" height: "+t+"px;",i+=" background-color: ",i+=l.isDark(e,o)?"#000000":"#ffffff",i+=";",i+='"/>';i+="</tr>"}return i+="</tbody>",i+="</table>",i},l.createSvgTag=function(t,e,i,o){let s={};"object"==typeof arguments[0]&&(s=arguments[0],t=s.cellSize,e=s.margin,i=s.alt,o=s.title),t=t||2,e=void 0===e?4*t:e,(i="string"==typeof i?{text:i}:i||{}).text=i.text||null,i.id=i.text?i.id||"qrcode-description":null,(o="string"==typeof o?{text:o}:o||{}).text=o.text||null,o.id=o.text?o.id||"qrcode-title":null;const n=l.getModuleCount()*t+2*e;let r,a,c,h,d,u="";for(d="l"+t+",0 0,"+t+" -"+t+",0 0,-"+t+"z ",u+='<svg version="1.1" xmlns="http://www.w3.org/2000/svg"',u+=s.scalable?"":' width="'+n+'px" height="'+n+'px"',u+=' viewBox="0 0 '+n+" "+n+'" ',u+=' preserveAspectRatio="xMinYMin meet"',u+=o.text||i.text?' role="img" aria-labelledby="'+m([o.id,i.id].join(" ").trim())+'"':"",u+=">",u+=o.text?'<title id="'+m(o.id)+'">'+m(o.text)+"</title>":"",u+=i.text?'<description id="'+m(i.id)+'">'+m(i.text)+"</description>":"",u+='<rect width="100%" height="100%" fill="white" cx="0" cy="0"/>',u+='<path d="',c=0;c<l.getModuleCount();c+=1)for(h=c*t+e,r=0;r<l.getModuleCount();r+=1)l.isDark(c,r)&&(a=r*t+e,u+="M"+a+","+h+d);return u+='" stroke="transparent" fill="black"/>',u+="</svg>",u},l.createDataURL=function(t,e){t=t||2,e=void 0===e?4*t:e;const i=l.getModuleCount()*t+2*e,o=e,s=i-e;return se(i,i,function(e,i){if(o<=e&&e<s&&o<=i&&i<s){const s=Math.floor((e-o)/t),n=Math.floor((i-o)/t);return l.isDark(n,s)?0:1}return 1})},l.createImgTag=function(t,e,i){t=t||2,e=void 0===e?4*t:e;const o=l.getModuleCount()*t+2*e;let s="";return s+="<img",s+=' src="',s+=l.createDataURL(t,e),s+='"',s+=' width="',s+=o,s+='"',s+=' height="',s+=o,s+='"',i&&(s+=' alt="',s+=m(i),s+='"'),s+="/>",s};const m=function(t){let e="";for(let i=0;i<t.length;i+=1){const o=t.charAt(i);switch(o){case"<":e+="&lt;";break;case">":e+="&gt;";break;case"&":e+="&amp;";break;case'"':e+="&quot;";break;default:e+=o}}return e};return l.createASCII=function(t,e){if((t=t||1)<2)return function(t){t=void 0===t?2:t;const e=1*l.getModuleCount()+2*t,i=t,o=e-t;let s,n,r,a,c;const h={"██":"█","█ ":"▀"," █":"▄","  ":" "},d={"██":"▀","█ ":"▀"," █":" ","  ":" "};let u="";for(s=0;s<e;s+=2){for(r=Math.floor((s-i)/1),a=Math.floor((s+1-i)/1),n=0;n<e;n+=1)c="█",i<=n&&n<o&&i<=s&&s<o&&l.isDark(r,Math.floor((n-i)/1))&&(c=" "),i<=n&&n<o&&i<=s+1&&s+1<o&&l.isDark(a,Math.floor((n-i)/1))?c+=" ":c+="█",u+=t<1&&s+1>=o?d[c]:h[c];u+="\n"}return e%2&&t>0?u.substring(0,u.length-e-1)+Array(e+1).join("▀"):u.substring(0,u.length-1)}(e);t-=1,e=void 0===e?2*t:e;const i=l.getModuleCount()*t+2*e,o=e,s=i-e;let n,r,a,c;const h=Array(t+1).join("██"),d=Array(t+1).join("  ");let u="",p="";for(n=0;n<i;n+=1){for(a=Math.floor((n-o)/t),p="",r=0;r<i;r+=1)c=1,o<=r&&r<s&&o<=n&&n<s&&l.isDark(a,Math.floor((r-o)/t))&&(c=0),p+=c?h:d;for(a=0;a<t;a+=1)u+=p+"\n"}return u.substring(0,u.length-1)},l.renderTo2dContext=function(t,e){e=e||2;const i=l.getModuleCount();for(let o=0;o<i;o++)for(let s=0;s<i;s++)t.fillStyle=l.isDark(o,s)?"black":"white",t.fillRect(s*e,o*e,e,e)},l};It.stringToBytes=function(t){const e=[];for(let i=0;i<t.length;i+=1){const o=t.charCodeAt(i);e.push(255&o)}return e},It.createStringToBytes=function(t,e){const i=function(){const i=oe(t),o=function(){const t=i.read();if(-1==t)throw"eof";return t};let s=0;const n={};for(;;){const t=i.read();if(-1==t)break;const e=o(),r=o()<<8|o();n[String.fromCharCode(t<<8|e)]=r,s+=1}if(s!=e)throw s+" != "+e;return n}(),o="?".charCodeAt(0);return function(t){const e=[];for(let s=0;s<t.length;s+=1){const n=t.charCodeAt(s);if(n<128)e.push(n);else{const n=i[t.charAt(s)];"number"==typeof n?(255&n)==n?e.push(n):(e.push(n>>>8),e.push(255&n)):e.push(o)}}return e}};const Ot=1,Dt=2,Nt=4,Lt=8,Rt={L:1,M:0,Q:3,H:2},Bt=0,jt=1,Wt=2,Ut=3,qt=4,Ft=5,Ht=6,Vt=7,Zt=function(){const t=[[],[6,18],[6,22],[6,26],[6,30],[6,34],[6,22,38],[6,24,42],[6,26,46],[6,28,50],[6,30,54],[6,32,58],[6,34,62],[6,26,46,66],[6,26,48,70],[6,26,50,74],[6,30,54,78],[6,30,56,82],[6,30,58,86],[6,34,62,90],[6,28,50,72,94],[6,26,50,74,98],[6,30,54,78,102],[6,28,54,80,106],[6,32,58,84,110],[6,30,58,86,114],[6,34,62,90,118],[6,26,50,74,98,122],[6,30,54,78,102,126],[6,26,52,78,104,130],[6,30,56,82,108,134],[6,34,60,86,112,138],[6,30,58,86,114,142],[6,34,62,90,118,146],[6,30,54,78,102,126,150],[6,24,50,76,102,128,154],[6,28,54,80,106,132,158],[6,32,58,84,110,136,162],[6,26,54,82,110,138,166],[6,30,58,86,114,142,170]],e=1335,i=7973,o={},s=function(t){let e=0;for(;0!=t;)e+=1,t>>>=1;return e};return o.getBCHTypeInfo=function(t){let i=t<<10;for(;s(i)-s(e)>=0;)i^=e<<s(i)-s(e);return 21522^(t<<10|i)},o.getBCHTypeNumber=function(t){let e=t<<12;for(;s(e)-s(i)>=0;)e^=i<<s(e)-s(i);return t<<12|e},o.getPatternPosition=function(e){return t[e-1]},o.getMaskFunction=function(t){switch(t){case Bt:return function(t,e){return(t+e)%2==0};case jt:return function(t,e){return t%2==0};case Wt:return function(t,e){return e%3==0};case Ut:return function(t,e){return(t+e)%3==0};case qt:return function(t,e){return(Math.floor(t/2)+Math.floor(e/3))%2==0};case Ft:return function(t,e){return t*e%2+t*e%3==0};case Ht:return function(t,e){return(t*e%2+t*e%3)%2==0};case Vt:return function(t,e){return(t*e%3+(t+e)%2)%2==0};default:throw"bad maskPattern:"+t}},o.getErrorCorrectPolynomial=function(t){let e=Yt([1],0);for(let i=0;i<t;i+=1)e=e.multiply(Yt([1,Qt.gexp(i)],0));return e},o.getLengthInBits=function(t,e){if(1<=e&&e<10)switch(t){case Ot:return 10;case Dt:return 9;case Nt:case Lt:return 8;default:throw"mode:"+t}else if(e<27)switch(t){case Ot:return 12;case Dt:return 11;case Nt:return 16;case Lt:return 10;default:throw"mode:"+t}else{if(!(e<41))throw"type:"+e;switch(t){case Ot:return 14;case Dt:return 13;case Nt:return 16;case Lt:return 12;default:throw"mode:"+t}}},o.getLostPoint=function(t){const e=t.getModuleCount();let i=0;for(let o=0;o<e;o+=1)for(let s=0;s<e;s+=1){let n=0;const r=t.isDark(o,s);for(let i=-1;i<=1;i+=1)if(!(o+i<0||e<=o+i))for(let a=-1;a<=1;a+=1)s+a<0||e<=s+a||0==i&&0==a||r==t.isDark(o+i,s+a)&&(n+=1);n>5&&(i+=3+n-5)}for(let o=0;o<e-1;o+=1)for(let s=0;s<e-1;s+=1){let e=0;t.isDark(o,s)&&(e+=1),t.isDark(o+1,s)&&(e+=1),t.isDark(o,s+1)&&(e+=1),t.isDark(o+1,s+1)&&(e+=1),0!=e&&4!=e||(i+=3)}for(let o=0;o<e;o+=1)for(let s=0;s<e-6;s+=1)t.isDark(o,s)&&!t.isDark(o,s+1)&&t.isDark(o,s+2)&&t.isDark(o,s+3)&&t.isDark(o,s+4)&&!t.isDark(o,s+5)&&t.isDark(o,s+6)&&(i+=40);for(let o=0;o<e;o+=1)for(let s=0;s<e-6;s+=1)t.isDark(s,o)&&!t.isDark(s+1,o)&&t.isDark(s+2,o)&&t.isDark(s+3,o)&&t.isDark(s+4,o)&&!t.isDark(s+5,o)&&t.isDark(s+6,o)&&(i+=40);let o=0;for(let i=0;i<e;i+=1)for(let s=0;s<e;s+=1)t.isDark(s,i)&&(o+=1);return i+=10*(Math.abs(100*o/e/e-50)/5),i},o}(),Qt=function(){const t=new Array(256),e=new Array(256);for(let e=0;e<8;e+=1)t[e]=1<<e;for(let e=8;e<256;e+=1)t[e]=t[e-4]^t[e-5]^t[e-6]^t[e-8];for(let i=0;i<255;i+=1)e[t[i]]=i;const i={glog:function(t){if(t<1)throw"glog("+t+")";return e[t]},gexp:function(e){for(;e<0;)e+=255;for(;e>=256;)e-=255;return t[e]}};return i}(),Yt=function(t,e){if(void 0===t.length)throw t.length+"/"+e;const i=function(){let i=0;for(;i<t.length&&0==t[i];)i+=1;const o=new Array(t.length-i+e);for(let e=0;e<t.length-i;e+=1)o[e]=t[e+i];return o}(),o={getAt:function(t){return i[t]},getLength:function(){return i.length},multiply:function(t){const e=new Array(o.getLength()+t.getLength()-1);for(let i=0;i<o.getLength();i+=1)for(let s=0;s<t.getLength();s+=1)e[i+s]^=Qt.gexp(Qt.glog(o.getAt(i))+Qt.glog(t.getAt(s)));return Yt(e,0)},mod:function(t){if(o.getLength()-t.getLength()<0)return o;const e=Qt.glog(o.getAt(0))-Qt.glog(t.getAt(0)),i=new Array(o.getLength());for(let t=0;t<o.getLength();t+=1)i[t]=o.getAt(t);for(let o=0;o<t.getLength();o+=1)i[o]^=Qt.gexp(Qt.glog(t.getAt(o))+e);return Yt(i,0).mod(t)}};return o},Kt=function(){const t=[[1,26,19],[1,26,16],[1,26,13],[1,26,9],[1,44,34],[1,44,28],[1,44,22],[1,44,16],[1,70,55],[1,70,44],[2,35,17],[2,35,13],[1,100,80],[2,50,32],[2,50,24],[4,25,9],[1,134,108],[2,67,43],[2,33,15,2,34,16],[2,33,11,2,34,12],[2,86,68],[4,43,27],[4,43,19],[4,43,15],[2,98,78],[4,49,31],[2,32,14,4,33,15],[4,39,13,1,40,14],[2,121,97],[2,60,38,2,61,39],[4,40,18,2,41,19],[4,40,14,2,41,15],[2,146,116],[3,58,36,2,59,37],[4,36,16,4,37,17],[4,36,12,4,37,13],[2,86,68,2,87,69],[4,69,43,1,70,44],[6,43,19,2,44,20],[6,43,15,2,44,16],[4,101,81],[1,80,50,4,81,51],[4,50,22,4,51,23],[3,36,12,8,37,13],[2,116,92,2,117,93],[6,58,36,2,59,37],[4,46,20,6,47,21],[7,42,14,4,43,15],[4,133,107],[8,59,37,1,60,38],[8,44,20,4,45,21],[12,33,11,4,34,12],[3,145,115,1,146,116],[4,64,40,5,65,41],[11,36,16,5,37,17],[11,36,12,5,37,13],[5,109,87,1,110,88],[5,65,41,5,66,42],[5,54,24,7,55,25],[11,36,12,7,37,13],[5,122,98,1,123,99],[7,73,45,3,74,46],[15,43,19,2,44,20],[3,45,15,13,46,16],[1,135,107,5,136,108],[10,74,46,1,75,47],[1,50,22,15,51,23],[2,42,14,17,43,15],[5,150,120,1,151,121],[9,69,43,4,70,44],[17,50,22,1,51,23],[2,42,14,19,43,15],[3,141,113,4,142,114],[3,70,44,11,71,45],[17,47,21,4,48,22],[9,39,13,16,40,14],[3,135,107,5,136,108],[3,67,41,13,68,42],[15,54,24,5,55,25],[15,43,15,10,44,16],[4,144,116,4,145,117],[17,68,42],[17,50,22,6,51,23],[19,46,16,6,47,17],[2,139,111,7,140,112],[17,74,46],[7,54,24,16,55,25],[34,37,13],[4,151,121,5,152,122],[4,75,47,14,76,48],[11,54,24,14,55,25],[16,45,15,14,46,16],[6,147,117,4,148,118],[6,73,45,14,74,46],[11,54,24,16,55,25],[30,46,16,2,47,17],[8,132,106,4,133,107],[8,75,47,13,76,48],[7,54,24,22,55,25],[22,45,15,13,46,16],[10,142,114,2,143,115],[19,74,46,4,75,47],[28,50,22,6,51,23],[33,46,16,4,47,17],[8,152,122,4,153,123],[22,73,45,3,74,46],[8,53,23,26,54,24],[12,45,15,28,46,16],[3,147,117,10,148,118],[3,73,45,23,74,46],[4,54,24,31,55,25],[11,45,15,31,46,16],[7,146,116,7,147,117],[21,73,45,7,74,46],[1,53,23,37,54,24],[19,45,15,26,46,16],[5,145,115,10,146,116],[19,75,47,10,76,48],[15,54,24,25,55,25],[23,45,15,25,46,16],[13,145,115,3,146,116],[2,74,46,29,75,47],[42,54,24,1,55,25],[23,45,15,28,46,16],[17,145,115],[10,74,46,23,75,47],[10,54,24,35,55,25],[19,45,15,35,46,16],[17,145,115,1,146,116],[14,74,46,21,75,47],[29,54,24,19,55,25],[11,45,15,46,46,16],[13,145,115,6,146,116],[14,74,46,23,75,47],[44,54,24,7,55,25],[59,46,16,1,47,17],[12,151,121,7,152,122],[12,75,47,26,76,48],[39,54,24,14,55,25],[22,45,15,41,46,16],[6,151,121,14,152,122],[6,75,47,34,76,48],[46,54,24,10,55,25],[2,45,15,64,46,16],[17,152,122,4,153,123],[29,74,46,14,75,47],[49,54,24,10,55,25],[24,45,15,46,46,16],[4,152,122,18,153,123],[13,74,46,32,75,47],[48,54,24,14,55,25],[42,45,15,32,46,16],[20,147,117,4,148,118],[40,75,47,7,76,48],[43,54,24,22,55,25],[10,45,15,67,46,16],[19,148,118,6,149,119],[18,75,47,31,76,48],[34,54,24,34,55,25],[20,45,15,61,46,16]],e=function(t,e){const i={};return i.totalCount=t,i.dataCount=e,i},i={};return i.getRSBlocks=function(i,o){const s=function(e,i){switch(i){case Rt.L:return t[4*(e-1)+0];case Rt.M:return t[4*(e-1)+1];case Rt.Q:return t[4*(e-1)+2];case Rt.H:return t[4*(e-1)+3];default:return}}(i,o);if(void 0===s)throw"bad rs block @ typeNumber:"+i+"/errorCorrectionLevel:"+o;const n=s.length/3,r=[];for(let t=0;t<n;t+=1){const i=s[3*t+0],o=s[3*t+1],n=s[3*t+2];for(let t=0;t<i;t+=1)r.push(e(o,n))}return r},i}(),Jt=function(){const t=[];let e=0;const i={getBuffer:function(){return t},getAt:function(e){const i=Math.floor(e/8);return 1==(t[i]>>>7-e%8&1)},put:function(t,e){for(let o=0;o<e;o+=1)i.putBit(1==(t>>>e-o-1&1))},getLengthInBits:function(){return e},putBit:function(i){const o=Math.floor(e/8);t.length<=o&&t.push(0),i&&(t[o]|=128>>>e%8),e+=1}};return i},Gt=function(t){const e=Ot,i=t,o={getMode:function(){return e},getLength:function(t){return i.length},write:function(t){const e=i;let o=0;for(;o+2<e.length;)t.put(s(e.substring(o,o+3)),10),o+=3;o<e.length&&(e.length-o==1?t.put(s(e.substring(o,o+1)),4):e.length-o==2&&t.put(s(e.substring(o,o+2)),7))}},s=function(t){let e=0;for(let i=0;i<t.length;i+=1)e=10*e+n(t.charAt(i));return e},n=function(t){if("0"<=t&&t<="9")return t.charCodeAt(0)-"0".charCodeAt(0);throw"illegal char :"+t};return o},Xt=function(t){const e=Dt,i=t,o={getMode:function(){return e},getLength:function(t){return i.length},write:function(t){const e=i;let o=0;for(;o+1<e.length;)t.put(45*s(e.charAt(o))+s(e.charAt(o+1)),11),o+=2;o<e.length&&t.put(s(e.charAt(o)),6)}},s=function(t){if("0"<=t&&t<="9")return t.charCodeAt(0)-"0".charCodeAt(0);if("A"<=t&&t<="Z")return t.charCodeAt(0)-"A".charCodeAt(0)+10;switch(t){case" ":return 36;case"$":return 37;case"%":return 38;case"*":return 39;case"+":return 40;case"-":return 41;case".":return 42;case"/":return 43;case":":return 44;default:throw"illegal char :"+t}};return o},te=function(t){const e=Nt,i=It.stringToBytes(t),o={getMode:function(){return e},getLength:function(t){return i.length},write:function(t){for(let e=0;e<i.length;e+=1)t.put(i[e],8)}};return o},ee=function(t){const e=Lt,i=It.stringToBytes;!function(){const t=i("友");if(2!=t.length||38726!=(t[0]<<8|t[1]))throw"sjis not supported."}();const o=i(t),s={getMode:function(){return e},getLength:function(t){return~~(o.length/2)},write:function(t){const e=o;let i=0;for(;i+1<e.length;){let o=(255&e[i])<<8|255&e[i+1];if(33088<=o&&o<=40956)o-=33088;else{if(!(57408<=o&&o<=60351))throw"illegal char at "+(i+1)+"/"+o;o-=49472}o=192*(o>>>8&255)+(255&o),t.put(o,13),i+=2}if(i<e.length)throw"illegal char at "+(i+1)}};return s},ie=function(){const t=[],e={writeByte:function(e){t.push(255&e)},writeShort:function(t){e.writeByte(t),e.writeByte(t>>>8)},writeBytes:function(t,i,o){i=i||0,o=o||t.length;for(let s=0;s<o;s+=1)e.writeByte(t[s+i])},writeString:function(t){for(let i=0;i<t.length;i+=1)e.writeByte(t.charCodeAt(i))},toByteArray:function(){return t},toString:function(){let e="";e+="[";for(let i=0;i<t.length;i+=1)i>0&&(e+=","),e+=t[i];return e+="]",e}};return e},oe=function(t){const e=t;let i=0,o=0,s=0;const n={read:function(){for(;s<8;){if(i>=e.length){if(0==s)return-1;throw"unexpected end of file./"+s}const t=e.charAt(i);if(i+=1,"="==t)return s=0,-1;t.match(/^\s$/)||(o=o<<6|r(t.charCodeAt(0)),s+=6)}const t=o>>>s-8&255;return s-=8,t}},r=function(t){if(65<=t&&t<=90)return t-65;if(97<=t&&t<=122)return t-97+26;if(48<=t&&t<=57)return t-48+52;if(43==t)return 62;if(47==t)return 63;throw"c:"+t};return n},se=function(t,e,i){const o=function(t,e){const i=t,o=e,s=new Array(t*e),n={setPixel:function(t,e,o){s[e*i+t]=o},write:function(t){t.writeString("GIF87a"),t.writeShort(i),t.writeShort(o),t.writeByte(128),t.writeByte(0),t.writeByte(0),t.writeByte(0),t.writeByte(0),t.writeByte(0),t.writeByte(255),t.writeByte(255),t.writeByte(255),t.writeString(","),t.writeShort(0),t.writeShort(0),t.writeShort(i),t.writeShort(o),t.writeByte(0);const e=r(2);t.writeByte(2);let s=0;for(;e.length-s>255;)t.writeByte(255),t.writeBytes(e,s,255),s+=255;t.writeByte(e.length-s),t.writeBytes(e,s,e.length-s),t.writeByte(0),t.writeString(";")}},r=function(t){const e=1<<t,i=1+(1<<t);let o=t+1;const n=a();for(let t=0;t<e;t+=1)n.add(String.fromCharCode(t));n.add(String.fromCharCode(e)),n.add(String.fromCharCode(i));const r=ie(),l=function(t){const e=t;let i=0,o=0;return{write:function(t,s){if(t>>>s!=0)throw"length over";for(;i+s>=8;)e.writeByte(255&(t<<i|o)),s-=8-i,t>>>=8-i,o=0,i=0;o|=t<<i,i+=s},flush:function(){i>0&&e.writeByte(o)}}}(r);l.write(e,o);let c=0,h=String.fromCharCode(s[c]);for(c+=1;c<s.length;){const t=String.fromCharCode(s[c]);c+=1,n.contains(h+t)?h+=t:(l.write(n.indexOf(h),o),n.size()<4095&&(n.size()==1<<o&&(o+=1),n.add(h+t)),h=t)}return l.write(n.indexOf(h),o),l.write(i,o),l.flush(),r.toByteArray()},a=function(){const t={};let e=0;const i={add:function(o){if(i.contains(o))throw"dup key:"+o;t[o]=e,e+=1},size:function(){return e},indexOf:function(e){return t[e]},contains:function(e){return void 0!==t[e]}};return i};return n}(t,e);for(let s=0;s<e;s+=1)for(let e=0;e<t;e+=1)o.setPixel(e,s,i(e,s));const s=ie();o.write(s);const n=function(){let t=0,e=0,i=0,o="";const s={},n=function(t){o+=String.fromCharCode(r(63&t))},r=function(t){if(t<0)throw"n:"+t;if(t<26)return 65+t;if(t<52)return t-26+97;if(t<62)return t-52+48;if(62==t)return 43;if(63==t)return 47;throw"n:"+t};return s.writeByte=function(o){for(t=t<<8|255&o,e+=8,i+=1;e>=6;)n(t>>>e-6),e-=6},s.flush=function(){if(e>0&&(n(t<<6-e),t=0,e=0),i%3!=0){const t=3-i%3;for(let e=0;e<t;e+=1)o+="="}},s.toString=function(){return o},s}(),r=s.toByteArray();for(let t=0;t<r.length;t+=1)n.writeByte(r[t]);return n.flush(),"data:image/gif;base64,"+n},ne="fi:";function re(t){return t.startsWith(ne)?t.slice(3):null}function ae(t,e=4){const i=It(0,"M");return i.addData(function(t){return`${ne}${t.id}`}(t)),i.make(),i.createSvgTag({cellSize:e,margin:0,scalable:!0})}function le(t){return t.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;")}function ce(t,e){const i=document.createElement("iframe");i.style.position="fixed",i.style.right="0",i.style.bottom="0",i.style.width="0",i.style.height="0",i.style.border="0",document.body.appendChild(i);const o=i.contentDocument;o?(o.open(),o.write(`<!doctype html>\n<html>\n<head>\n<meta charset="utf-8">\n<title>Freezer Inventory Labels</title>\n<style>\n  @page { margin: 10mm; }\n  body {\n    margin: 0;\n    font-family: system-ui, sans-serif;\n    color: #000;\n    background: #fff;\n    display: flex;\n    flex-wrap: wrap;\n    gap: 4mm;\n    align-content: flex-start;\n  }\n  .label {\n    display: flex;\n    align-items: center;\n    gap: 4mm;\n    width: 88mm;\n    min-height: 36mm;\n    border: 0.3mm dashed #999;\n    border-radius: 2mm;\n    padding: 3mm;\n    box-sizing: border-box;\n    page-break-inside: avoid;\n  }\n  .qr { flex: none; width: 28mm; height: 28mm; }\n  .qr svg { width: 100%; height: 100%; }\n  .text { min-width: 0; }\n  .name { font-size: 14pt; font-weight: 700; line-height: 1.2; }\n  .meta { font-size: 12pt; margin-top: 1.5mm; }\n  .note { font-size: 10pt; font-style: italic; margin-top: 1mm; }\n</style>\n</head>\n<body>${t.map(t=>function(t,e){const i=[];return null!=t.weight&&i.push(`${t.weight} ${t.unit||"g"}`),null!=t.pieces&&i.push(`${t.pieces} ${e("pieces_short")}`),`\n    <div class="label">\n      <div class="qr">${ae(t)}</div>\n      <div class="text">\n        <div class="name">${le(t.product_name)}</div>\n        <div class="meta">${gt(t)}${i.length?" · "+i.join(" · "):""}</div>\n        ${t.note?`<div class="note">${le(t.note)}</div>`:""}\n      </div>\n    </div>`}(t,e)).join("")}</body>\n</html>`),o.close(),i.onload=()=>{const t=i.contentWindow;t&&(t.focus(),t.print()),setTimeout(()=>i.remove(),6e4)}):i.remove()}function he(){return"function"==typeof window.BarcodeDetector}class de extends at{constructor(){super(...arguments),this._error="",this._stream=null,this._found=!1}connectedCallback(){super.connectedCallback(),this._start()}disconnectedCallback(){super.disconnectedCallback(),this._stop()}async _start(){const t=this.localize;if(!he())return void(this._error=t("scan_unsupported"));try{this._stream=await navigator.mediaDevices.getUserMedia({video:{facingMode:"environment"},audio:!1})}catch{return void(this._error=t("scan_camera_denied"))}await this.updateComplete;const e=this.renderRoot.querySelector("video");if(!e||!this._stream)return;e.srcObject=this._stream,await e.play().catch(()=>{});const i=new window.BarcodeDetector({formats:["qr_code"]});this._timer=setInterval(async()=>{if(!this._found&&e.videoWidth)try{const t=await i.detect(e);for(const e of t){const t=re(e.rawValue);if(t)return this._found=!0,this._stop(),void $t(this,"fi-scan-found",{itemId:t})}}catch{}},300)}_stop(){this._timer&&clearInterval(this._timer),this._timer=void 0,this._stream?.getTracks().forEach(t=>t.stop()),this._stream=null}render(){const t=this.localize;return q`
      <h2 class="view-title">${t("scan_title")}</h2>
      ${this._error?q`<div class="error-banner">${this._error}</div>`:q`
            <div class="viewport">
              <video playsinline muted></video>
              <div class="target"></div>
            </div>
            <p class="hint">${t("scan_hint")}</p>
          `}
      <div class="row-of-buttons">
        <button class="btn btn-outline" @click=${()=>$t(this,"fi-scan-cancel")}>
          ${t("cancel")}
        </button>
      </div>
      ${H}
    `}static{this.styles=[kt,r`
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
    `]}}t([dt({attribute:!1})],de.prototype,"localize",void 0),t([ut()],de.prototype,"_error",void 0),customElements.define("fi-scan-view",de);const ue="__none__";class pe extends at{constructor(){super(...arguments),this.items=[],this.categories=[],this.oldMonths=6,this.showWeight=!0,this.showNote=!0,this.isAdmin=!1,this._filter=null}_ageClass(t){const e=t.category_id?this.categories.find(e=>e.id===t.category_id):void 0,i=e?.max_months??this.oldMonths,o=vt(t);return o>=i?"danger":o>=Math.ceil(i/2)?"warn":""}_categoryFor(t){return t.category_id?this.categories.find(e=>e.id===t.category_id):void 0}get _filterChips(){const t=new Set(this.items.map(t=>t.category_id??ue)),e=this.categories.filter(e=>e.enabled&&t.has(e.id)).map(t=>({id:t.id,name:t.name}));return t.has(ue)&&e.length&&e.push({id:ue,name:this.localize("uncategorized")}),e}get _visibleItems(){return this._filter?this.items.filter(t=>(t.category_id??ue)===this._filter):this.items}render(){if(!this.items.length)return q`
        <div class="empty">
          <div class="empty-icon"><ha-icon icon="mdi:snowflake"></ha-icon></div>
          <p>${this.localize("empty_freezer")}</p>
          <div class="footer empty-footer">
            <button
              class="btn btn-primary"
              @click=${()=>$t(this,"fi-add")}
            >
              ${this.localize("add_first_item")}
            </button>
            ${this.isAdmin?q`
                  <button
                    class="btn btn-quiet manage-btn"
                    title=${this.localize("manage")}
                    aria-label=${this.localize("manage")}
                    @click=${()=>$t(this,"fi-manage")}
                  >
                    <ha-icon icon="mdi:cog-outline"></ha-icon>
                  </button>
                `:H}
          </div>
        </div>
      `;const t=this._filterChips;return q`
      ${t.length>1?q`
            <div class="chips filter-row">
              <button
                class="chip ${null===this._filter?"active":""}"
                @click=${()=>this._filter=null}
              >
                ${this.localize("all")}
              </button>
              ${t.map(t=>q`
                  <button
                    class="chip ${this._filter===t.id?"active":""}"
                    @click=${()=>this._filter=this._filter===t.id?null:t.id}
                  >
                    ${t.name}
                  </button>
                `)}
            </div>
          `:H}
      <div class="list" role="list">
        ${this._visibleItems.map(t=>this._renderRow(t))}
      </div>
      <div class="footer">
        <button class="btn btn-primary" @click=${()=>$t(this,"fi-add")}>
          ${this.localize("add")}
        </button>
        ${he()?q`
              <button
                class="btn btn-quiet manage-btn"
                title=${this.localize("scan_button")}
                aria-label=${this.localize("scan_button")}
                @click=${()=>$t(this,"fi-scan")}
              >
                <ha-icon icon="mdi:qrcode-scan"></ha-icon>
              </button>
            `:H}
        ${this.isAdmin?q`
              <button
                class="btn btn-quiet manage-btn"
                title=${this.localize("manage")}
                aria-label=${this.localize("manage")}
                @click=${()=>$t(this,"fi-manage")}
              >
                <ha-icon icon="mdi:cog-outline"></ha-icon>
              </button>
            `:H}
      </div>
    `}_renderRow(t){const e=this._ageClass(t),i=vt(t),o=this._categoryFor(t),s=[];null!=t.weight&&s.push(`${t.weight} ${t.unit||"g"}`),null!=t.pieces&&s.push(`${t.pieces} ${this.localize("pieces_short")}`);const n=s.length?s.join(" · "):this.localize("no_weight");return q`
      <button
        class="item-row ${e}"
        role="listitem"
        @click=${()=>$t(this,"fi-select-item",{item:t})}
      >
        <span
          class="avatar ${e}"
          style=${e?"":yt(o?.color)}
        >
          ${bt(o?.icon,"mdi:snowflake")}
        </span>
        <span class="item-main">
          <span class="item-name">${t.product_name}</span>
          <span class="item-sub">
            ${gt(t)}${this.showWeight?q` · ${n}`:H}
            ${this.showNote&&t.note?q`<span class="item-note"> · ${t.note}</span>`:H}
          </span>
        </span>
        ${e?q`<span class="age-badge ${e}"
              >${this.localize("months_old",{months:i})}</span
            >`:H}
      </button>
    `}static{this.styles=[kt,r`
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
    `]}}t([dt({attribute:!1})],pe.prototype,"items",void 0),t([dt({attribute:!1})],pe.prototype,"categories",void 0),t([dt({attribute:!1})],pe.prototype,"localize",void 0),t([dt({attribute:!1})],pe.prototype,"oldMonths",void 0),t([dt({attribute:!1})],pe.prototype,"showWeight",void 0),t([dt({attribute:!1})],pe.prototype,"showNote",void 0),t([dt({attribute:!1})],pe.prototype,"isAdmin",void 0),t([ut()],pe.prototype,"_filter",void 0),customElements.define("fi-list-view",pe);class _e extends at{constructor(){super(...arguments),this.products=[],this.categories=[]}get _groups(){const t=this.products.filter(t=>t.enabled),e=[];for(const i of this.categories.filter(t=>t.enabled)){const o=t.filter(t=>t.category_id===i.id);o.length&&e.push({category:i,products:o})}const i=new Set(this.categories.map(t=>t.id)),o=t.filter(t=>!t.category_id||!i.has(t.category_id));return o.length&&e.push({category:null,products:o}),e}render(){return q`
      <h2 class="view-title">${this.localize("what_to_add")}</h2>
      ${this._groups.map(t=>q`
          <div class="group">
            ${t.category?q`<h3 class="group-title">${t.category.name}</h3>`:q`<h3 class="group-title">${this.localize("uncategorized")}</h3>`}
            <div class="tiles">
              ${t.products.map(e=>q`
                  <button
                    class="tile"
                    @click=${()=>$t(this,"fi-pick-product",{product:e})}
                  >
                    <span class="avatar" style=${yt(t.category?.color)}>
                      ${bt(e.icon||t.category?.icon,"mdi:food")}
                    </span>
                    <span class="tile-name">${e.name}</span>
                  </button>
                `)}
            </div>
          </div>
        `)}
      <div class="group">
        <div class="tiles">
          <button
            class="tile other"
            @click=${()=>$t(this,"fi-pick-other")}
          >
            <span class="avatar"><ha-icon icon="mdi:pencil-plus"></ha-icon></span>
            <span class="tile-name">${this.localize("other_product")}</span>
          </button>
        </div>
      </div>
      ${H}
    `}static{this.styles=[kt,r`
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
    `]}}t([dt({attribute:!1})],_e.prototype,"products",void 0),t([dt({attribute:!1})],_e.prototype,"categories",void 0),t([dt({attribute:!1})],_e.prototype,"localize",void 0),customElements.define("fi-product-picker",_e);class fe extends at{constructor(){super(...arguments),this.product=null,this.item=null,this.submitting=!1,this.errorText="",this._name="",this._weight="",this._originalWeight="",this._pieces="",this._month=(new Date).getMonth()+1,this._year=(new Date).getFullYear(),this._note="",this._quantity=1,this._validationError="",this._confirmZeroWeight=!1}get _isEdit(){return null!==this.item}willUpdate(t){(t.has("item")||t.has("product"))&&this._initFromProps()}_initFromProps(){this._validationError="",this._confirmZeroWeight=!1,this._quantity=1,this.item?(this._name=this.item.product_name,this._weight=null!=this.item.weight?String(this.item.weight):"",this._originalWeight=null!=this.item.original_weight?String(this.item.original_weight):"",this._pieces=null!=this.item.pieces?String(this.item.pieces):"",this._month=this.item.month,this._year=this.item.year,this._note=this.item.note??""):(this._name=this.product?.name??"",this._weight="",this._originalWeight="",this._pieces="",this._month=(new Date).getMonth()+1,this._year=(new Date).getFullYear(),this._note="")}get _showWeightField(){return!!this._isEdit||(!this.product||this.product.ask_for_weight)}_parseWeight(t){const e=t.trim();if(!e)return null;const i=Number(e);return!(!Number.isFinite(i)||i<0||!Number.isInteger(i))&&i}_submit(){const t=this.localize;this._validationError="";const e=this._name.trim();if(!e)return void(this._validationError=t("err_name_required"));const i=this._parseWeight(this._weight);if(!1===i)return void(this._validationError=t("err_invalid_weight"));let o=null;if(this._isEdit&&(o=this._parseWeight(this._originalWeight),!1===o||0===o))return void(this._validationError=t("err_invalid_weight"));const s=this._parseWeight(this._pieces);if(!1===s||0===s)return void(this._validationError=t("err_invalid_pieces"));if(this._month<1||this._month>12)return void(this._validationError=t("err_invalid_month"));const n=(new Date).getFullYear();if(this._year<n-20||this._year>n+5)return void(this._validationError=t("err_invalid_year"));if(!this._isEdit&&0===i)return void(this._validationError=t("err_invalid_weight"));if(this._isEdit&&0===i)return void(this._confirmZeroWeight=!0);const r={product_id:this.product?.id??this.item?.product_id??void 0,product_name:e,month:this._month,year:this._year,weight:i,pieces:s,note:this._note.trim(),quantity:this._quantity};this._isEdit&&(r.original_weight=o),$t(this,"fi-form-submit",{result:r})}render(){const t=this.localize;let e=[],i=[];if(!this._isEdit){const t=new Set(this.product?.quick_weights??[]);null!=this.product?.default_weight&&t.add(this.product.default_weight),e=[...t].sort((t,e)=>t-e),i=this.product?.quick_pieces?.length?this.product.quick_pieces:[1,2,3,4,6]}const o=(new Date).getFullYear(),s=[];for(let t=o+1;t>=o-20;t--)s.push(t);return this._confirmZeroWeight?q`
        <h2 class="view-title">${t("edit_item_title")}</h2>
        <p class="confirm-text">${t("weight_zero_remove")}</p>
        <div class="row-of-buttons">
          <button
            class="btn btn-danger"
            @click=${()=>$t(this,"fi-form-remove")}
          >
            ${t("remove_item_btn")}
          </button>
          <button
            class="btn btn-outline"
            @click=${()=>this._confirmZeroWeight=!1}
          >
            ${t("cancel")}
          </button>
        </div>
      `:q`
      <h2 class="view-title">
        ${this._isEdit?t("edit_item_title"):t("add_product_title",{name:this._name||"…"})}
      </h2>

      ${this.errorText?q`<div class="error-banner">${this.errorText}</div>`:H}
      ${this._validationError?q`<div class="error-banner">${this._validationError}</div>`:H}

      <div class="form-body">
      ${this._isEdit||!this.product?q`
            <div class="field">
              <label for="name">${t(this._isEdit?"product":"custom_product_name")}</label>
              <input
                id="name"
                type="text"
                .value=${this._name}
                @input=${t=>this._name=t.target.value}
              />
            </div>
          `:H}

      ${this._showWeightField?q`
            <div class="field">
              <label for="weight">
                ${t("weight")} <span class="opt">(${t("optional")})</span>
              </label>
              ${e.length?q`
                    <div class="chips weight-chips">
                      ${e.map(t=>q`
                          <button
                            class="chip ${this._weight===String(t)?"active":""}"
                            @click=${()=>this._weight=this._weight===String(t)?"":String(t)}
                          >
                            ${t} g
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
                  @input=${t=>this._weight=t.target.value}
                />
                <span class="unit">g</span>
              </div>
            </div>
          `:H}

      <div class="field">
        <label for="pieces">
          ${t("pieces_field")} <span class="opt">(${t("optional")})</span>
        </label>
        ${i.length?q`
              <div class="chips weight-chips">
                ${i.map(e=>q`
                    <button
                      class="chip ${this._pieces===String(e)?"active":""}"
                      @click=${()=>this._pieces=this._pieces===String(e)?"":String(e)}
                    >
                      ${e} ${t("pieces_short")}
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
            @input=${t=>this._pieces=t.target.value}
          />
          <span class="unit">${t("pieces_short")}</span>
        </div>
      </div>

      ${this._isEdit?q`
            <div class="field">
              <label for="oweight">
                ${t("original_weight")} <span class="opt">(${t("optional")})</span>
              </label>
              <div class="weight-input">
                <input
                  id="oweight"
                  type="number"
                  inputmode="numeric"
                  min="1"
                  step="1"
                  .value=${this._originalWeight}
                  @input=${t=>this._originalWeight=t.target.value}
                />
                <span class="unit">g</span>
              </div>
            </div>
          `:H}

      <div class="two-cols">
        <div class="field">
          <label for="month">${t("month")}</label>
          <select
            id="month"
            .value=${String(this._month)}
            @change=${t=>this._month=Number(t.target.value)}
          >
            ${Array.from({length:12},(t,e)=>e+1).map(e=>q`
                <option value=${e} ?selected=${e===this._month}>
                  ${t(`month_${e}`)}
                </option>
              `)}
          </select>
        </div>
        <div class="field">
          <label for="year">${t("year")}</label>
          <select
            id="year"
            .value=${String(this._year)}
            @change=${t=>this._year=Number(t.target.value)}
          >
            ${s.map(t=>q`
                <option value=${t} ?selected=${t===this._year}>${t}</option>
              `)}
          </select>
        </div>
      </div>

      ${this._isEdit?H:q`
            <div class="field">
              <label>${t("quantity")}</label>
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
          ${t("note")} <span class="opt">(${t("optional")})</span>
        </label>
        <input
          id="note"
          type="text"
          .value=${this._note}
          @input=${t=>this._note=t.target.value}
        />
      </div>
      </div>

      <div class="row-of-buttons">
        <button
          class="btn btn-primary"
          ?disabled=${this.submitting}
          @click=${this._submit}
        >
          ${this._isEdit?t("save"):t("add_to_freezer")}
        </button>
        <button
          class="btn btn-outline"
          @click=${()=>$t(this,"fi-form-cancel")}
        >
          ${t("cancel")}
        </button>
      </div>
    `}static{this.styles=[kt,r`
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
    `]}}t([dt({attribute:!1})],fe.prototype,"localize",void 0),t([dt({attribute:!1})],fe.prototype,"product",void 0),t([dt({attribute:!1})],fe.prototype,"item",void 0),t([dt({attribute:!1})],fe.prototype,"submitting",void 0),t([dt({attribute:!1})],fe.prototype,"errorText",void 0),t([ut()],fe.prototype,"_name",void 0),t([ut()],fe.prototype,"_weight",void 0),t([ut()],fe.prototype,"_originalWeight",void 0),t([ut()],fe.prototype,"_pieces",void 0),t([ut()],fe.prototype,"_month",void 0),t([ut()],fe.prototype,"_year",void 0),t([ut()],fe.prototype,"_note",void 0),t([ut()],fe.prototype,"_quantity",void 0),t([ut()],fe.prototype,"_validationError",void 0),t([ut()],fe.prototype,"_confirmZeroWeight",void 0),customElements.define("fi-item-form",fe);const ge=2;class me{constructor(t){}get _$AU(){return this._$AM._$AU}_$AT(t,e,i){this._$Ct=t,this._$AM=e,this._$Ci=i}_$AS(t,e){return this.update(t,e)}update(t,e){return this.render(...e)}}class ve extends me{constructor(t){if(super(t),this.it=H,t.type!==ge)throw Error(this.constructor.directiveName+"() can only be used in child bindings")}render(t){if(t===H||null==t)return this._t=void 0,this.it=t;if(t===F)return t;if("string"!=typeof t)throw Error(this.constructor.directiveName+"() called with a non-string value");if(t===this.it)return this._t;this.it=t;const e=[t];return e.raw=e,this._t={_$litType$:this.constructor.resultType,strings:e,values:[]}}}ve.directiveName="unsafeHTML",ve.resultType=1;const be=(t=>(...e)=>({_$litDirective$:t,values:e}))(ve);class ye extends at{constructor(){super(...arguments),this.submitting=!1,this.errorText="",this.mode="confirm",this.canMove=!1,this._amount="",this._pieces="",this._validationError=""}willUpdate(t){(t.has("item")||t.has("mode"))&&(this._amount="",this._pieces="",this._validationError="")}get _halfLabel(){const t=this.localize;return null!=this.item.weight?t("remove_half",{half:Math.floor(this.item.weight/2+.5)}):t("remove_half_pieces",{half:Math.floor((this.item.pieces??0)/2+.5)})}_parseField(t){const e=t.trim();if(!e)return null;const i=Number(e);return!(!Number.isFinite(i)||!Number.isInteger(i)||i<=0)&&i}_submitAmount(){const t=this.localize;this._validationError="";const e=null!=this.item.weight?this._parseField(this._amount):null,i=null!=this.item.pieces?this._parseField(this._pieces):null;!1!==e?!1!==i?null!==e||null!==i?null!==e&&e>(this.item.weight??0)?this._validationError=t("err_amount_too_big",{amount:e,weight:this.item.weight??0}):null!==i&&i>(this.item.pieces??0)?this._validationError=t("err_pieces_too_big",{pieces:i,count:this.item.pieces??0}):$t(this,"fi-remove-amount",{amount:e,pieces:i}):this._validationError=t("err_nothing_to_remove"):this._validationError=t("err_invalid_pieces"):this._validationError=t("err_invalid_amount")}render(){return"amount"===this.mode?this._renderAmount():this._renderConfirm()}_renderConfirm(){const t=this.localize,e=null!=this.item.weight,i=null!=this.item.pieces,o=e||i&&(this.item.pieces??0)>1;return q`
      <div class="title-row">
        <h2 class="view-title question">
          ${t("remove_question",{label:mt(this.item,t)})}
        </h2>
        <div class="qr" title=${this.item.id}>${be(ae(this.item,3))}</div>
      </div>
      ${this.item.note?q`
            <p class="note">
              <span class="note-label">${t("note_label")}</span> ${this.item.note}
            </p>
          `:H}
      ${this.errorText?q`<div class="error-banner">${this.errorText}</div>`:H}
      <div class="row-of-buttons">
        <button
          class="btn btn-primary"
          ?disabled=${this.submitting}
          @click=${()=>$t(this,"fi-remove-all")}
        >
          ${t("remove_all")}
        </button>
        ${o?q`
              <button
                class="btn btn-outline"
                ?disabled=${this.submitting}
                @click=${()=>$t(this,"fi-remove-half")}
              >
                ${this._halfLabel}
              </button>
            `:H}
        ${e||i?q`
              <button
                class="btn btn-outline"
                @click=${()=>$t(this,"fi-enter-amount")}
              >
                ${t("remove_amount")}
              </button>
            `:H}
        <button
          class="btn btn-outline"
          @click=${()=>$t(this,"fi-edit-item")}
        >
          ${t("edit")}
        </button>
        ${this.canMove?q`
              <button
                class="btn btn-outline"
                @click=${()=>$t(this,"fi-move-item")}
              >
                ${t("move")}
              </button>
            `:H}
        <button
          class="btn btn-outline"
          @click=${()=>$t(this,"fi-print-label")}
        >
          ${t("print_label")}
        </button>
        <button
          class="btn btn-quiet"
          @click=${()=>$t(this,"fi-remove-cancel")}
        >
          ${t("cancel")}
        </button>
      </div>
    `}_renderAmount(){const t=this.localize,e=null!=this.item.weight,i=null!=this.item.pieces,o=this.item.weight??0,s=this.item.pieces??0,n=this.item.unit||"g",r=t("pieces_short"),a=this._parseField(this._amount),l=this._parseField(this._pieces),c=e&&a&&a<=o?o-a:null,h=i&&l&&l<=s?s-l:null,d=[];e&&d.push(`${o} ${n}`),i&&d.push(`${s} ${r}`);const u=[];return null!==c?u.push(`${c} ${n}`):e&&l&&u.push(`${o} ${n}`),null!==h?u.push(`${h} ${r}`):i&&a&&u.push(`${s} ${r}`),q`
      <h2 class="view-title">${t("how_much_remove")}</h2>
      <p class="current">
        ${t("currently_in_freezer")}
        <strong>${d.join(" · ")}</strong>
      </p>
      ${this.errorText?q`<div class="error-banner">${this.errorText}</div>`:H}
      ${this._validationError?q`<div class="error-banner">${this._validationError}</div>`:H}
      <div class="form-body">
      ${e?q`
            <div class="field">
              <label>${t("weight")}</label>
              <div class="amount-input">
                <input
                  type="number"
                  inputmode="numeric"
                  min="1"
                  max=${o}
                  step="1"
                  .value=${this._amount}
                  @input=${t=>this._amount=t.target.value}
                />
                <span class="unit">${n}</span>
              </div>
            </div>
          `:H}
      ${i?q`
            <div class="field">
              <label>${t("pieces_field")}</label>
              <div class="amount-input">
                <input
                  type="number"
                  inputmode="numeric"
                  min="1"
                  max=${s}
                  step="1"
                  .value=${this._pieces}
                  @input=${t=>this._pieces=t.target.value}
                />
                <span class="unit">${r}</span>
              </div>
            </div>
          `:H}
      </div>
      ${u.length&&(a||l)?q`
            <p class="remaining">
              ${t("remaining_after")}
              <strong>${u.join(" · ")}</strong>
            </p>
          `:H}
      <div class="row-of-buttons">
        <button
          class="btn btn-primary"
          ?disabled=${this.submitting}
          @click=${this._submitAmount}
        >
          ${t("confirm")}
        </button>
        <button
          class="btn btn-quiet"
          @click=${()=>$t(this,"fi-remove-cancel")}
        >
          ${t("cancel")}
        </button>
      </div>
    `}static{this.styles=[kt,r`
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
    `]}}t([dt({attribute:!1})],ye.prototype,"localize",void 0),t([dt({attribute:!1})],ye.prototype,"item",void 0),t([dt({attribute:!1})],ye.prototype,"submitting",void 0),t([dt({attribute:!1})],ye.prototype,"errorText",void 0),t([dt({attribute:!1})],ye.prototype,"mode",void 0),t([dt({attribute:!1})],ye.prototype,"canMove",void 0),t([ut()],ye.prototype,"_amount",void 0),t([ut()],ye.prototype,"_pieces",void 0),t([ut()],ye.prototype,"_validationError",void 0),customElements.define("fi-remove-dialog",ye);const $e=["#f59e0b","#f06292","#c62828","#8e24aa","#0288d1","#2e7d32","#00897b","#607d8b"];class we extends at{constructor(){super(...arguments),this.categories=[],this.products=[],this._tab="products",this._editing=null,this._confirm=null,this._error="",this._busy=!1,this._fName="",this._fIcon="",this._fCategoryId="",this._fDefaultWeight="",this._fQuickWeights="",this._fQuickPieces="",this._fAskForWeight=!0,this._fEnabled=!0,this._fMaxMonths="",this._fColor=null}async _run(t){this._busy=!0,this._error="";try{await t(),this._editing=null,this._confirm=null}catch(t){this._error=Mt(t,this.localize("err_generic"))}finally{this._busy=!1}}_startEditCategory(t){this._editing={kind:"category",category:t},this._error="",this._fName=t?.name??"",this._fIcon=t?.icon??"",this._fEnabled=t?.enabled??!0,this._fMaxMonths=null!=t?.max_months?String(t.max_months):"",this._fColor=t?.color??null}_startEditProduct(t){this._editing={kind:"product",product:t},this._error="",this._fName=t?.name??"",this._fIcon=t?.icon??"",this._fCategoryId=t?.category_id??"",this._fDefaultWeight=null!=t?.default_weight?String(t.default_weight):"",this._fQuickWeights=(t?.quick_weights??[]).join(", "),this._fQuickPieces=(t?.quick_pieces??[]).join(", "),this._fAskForWeight=t?.ask_for_weight??!0,this._fEnabled=t?.enabled??!0}_parseOptionalInt(t){const e=t.trim();if(!e)return null;const i=Number(e);return Number.isInteger(i)&&i>0?i:null}async _saveCategory(){const t=this._editing;if(!t||"category"!==t.kind)return;const e={name:this._fName.trim(),icon:this._fIcon.trim()||"mdi:food",color:this._fColor,max_months:this._parseOptionalInt(this._fMaxMonths)};await this._run(async()=>{t.category?await async function(t,e,i){return(await t.callWS({type:`${zt}/category/update`,category_id:e,...i})).category}(this.hass,t.category.id,{...e,enabled:this._fEnabled}):await async function(t,e){return(await t.callWS({type:`${zt}/category/create`,...e})).category}(this.hass,e)})}async _saveProduct(){const t=this._editing;if(!t||"product"!==t.kind)return;const e=t=>t.split(",").map(t=>Number(t.trim())).filter(t=>Number.isInteger(t)&&t>0),i={name:this._fName.trim(),icon:this._fIcon.trim()||"mdi:food",category_id:this._fCategoryId||null,default_weight:this._parseOptionalInt(this._fDefaultWeight),quick_weights:e(this._fQuickWeights),quick_pieces:e(this._fQuickPieces),ask_for_weight:this._fAskForWeight};await this._run(async()=>{t.product?await async function(t,e,i){return(await t.callWS({type:`${zt}/product/update`,product_id:e,...i})).product}(this.hass,t.product.id,{...i,enabled:this._fEnabled}):await async function(t,e){return(await t.callWS({type:`${zt}/product/create`,...e})).product}(this.hass,i)})}async _move(t,e,i){if("category"===t){const t=this.categories.map(t=>t.id),o=t.indexOf(e),s=o+i;if(o<0||s<0||s>=t.length)return;[t[o],t[s]]=[t[s],t[o]],await this._run(()=>async function(t,e){await t.callWS({type:`${zt}/categories/reorder`,category_ids:e})}(this.hass,t))}else{const t=this.products.map(t=>t.id),o=t.indexOf(e),s=o+i;if(o<0||s<0||s>=t.length)return;[t[o],t[s]]=[t[s],t[o]],await this._run(()=>async function(t,e){await t.callWS({type:`${zt}/products/reorder`,product_ids:e})}(this.hass,t))}}render(){const t=this.localize;return this._confirm?q`
        <p class="confirm-text">${this._confirm.text}</p>
        ${this._error?q`<div class="error-banner">${this._error}</div>`:H}
        <div class="row-of-buttons">
          <button
            class="btn btn-danger"
            ?disabled=${this._busy}
            @click=${()=>this._confirm&&this._run(this._confirm.action)}
          >
            ${t("confirm")}
          </button>
          <button class="btn btn-outline" @click=${()=>this._confirm=null}>
            ${t("cancel")}
          </button>
        </div>
      `:"category"===this._editing?.kind?this._renderCategoryForm():"product"===this._editing?.kind?this._renderProductForm():this._renderOverview()}_renderOverview(){const t=this.localize;return q`
      <h2 class="view-title">${t("manage")}</h2>
      <div class="chips tabs">
        <button
          class="chip ${"products"===this._tab?"active":""}"
          @click=${()=>this._tab="products"}
        >
          ${t("products")}
        </button>
        <button
          class="chip ${"categories"===this._tab?"active":""}"
          @click=${()=>this._tab="categories"}
        >
          ${t("categories")}
        </button>
      </div>
      ${this._error?q`<div class="error-banner">${this._error}</div>`:H}
      ${"products"===this._tab?this._renderProductList():this._renderCategoryList()}
      <div class="row-of-buttons bottom">
        <button
          class="btn btn-primary"
          @click=${()=>"products"===this._tab?this._startEditProduct(null):this._startEditCategory(null)}
        >
          ${"products"===this._tab?t("add_product_btn"):t("add_category")}
        </button>
        <button
          class="btn btn-outline"
          @click=${()=>$t(this,"fi-print-all")}
        >
          ${t("print_all_labels")}
        </button>
        <button
          class="btn btn-outline"
          @click=${()=>this._confirm={text:t("restore_defaults_confirm"),action:()=>async function(t){await t.callWS({type:`${zt}/restore_defaults`})}(this.hass)}}
        >
          ${t("restore_defaults")}
        </button>
        <button class="btn btn-quiet" @click=${()=>$t(this,"fi-manage-close")}>
          ${t("back")}
        </button>
      </div>
    `}_renderCategoryList(){const t=this.localize;return q`
      <div class="rows">
        ${this.categories.map((e,i)=>q`
            <div class="row ${e.enabled?"":"disabled"}">
              <span class="avatar small" style=${yt(e.color)}>
                ${bt(e.icon)}
              </span>
              <button class="row-main" @click=${()=>this._startEditCategory(e)}>
                <span class="row-name">${e.name}</span>
                ${null!=e.max_months?q`<span class="row-sub"
                      >${t("max_months")}: ${e.max_months}</span
                    >`:H}
              </button>
              <button
                class="icon-btn"
                title=${t("move_up")}
                ?disabled=${0===i}
                @click=${()=>this._move("category",e.id,-1)}
              >
                <ha-icon icon="mdi:chevron-up"></ha-icon>
              </button>
              <button
                class="icon-btn"
                title=${t("move_down")}
                ?disabled=${i===this.categories.length-1}
                @click=${()=>this._move("category",e.id,1)}
              >
                <ha-icon icon="mdi:chevron-down"></ha-icon>
              </button>
              <button
                class="icon-btn danger"
                title=${t("delete")}
                @click=${()=>this._confirm={text:t("delete_category_confirm",{name:e.name}),action:()=>async function(t,e){await t.callWS({type:`${zt}/category/delete`,category_id:e})}(this.hass,e.id)}}
              >
                <ha-icon icon="mdi:delete-outline"></ha-icon>
              </button>
            </div>
          `)}
      </div>
    `}_renderProductList(){const t=this.localize;return q`
      <div class="rows">
        ${this.products.map((e,i)=>{const o=this.categories.find(t=>t.id===e.category_id);return q`
            <div class="row ${e.enabled?"":"disabled"}">
              <span class="avatar small" style=${yt(o?.color)}>
                ${bt(e.icon)}
              </span>
              <button class="row-main" @click=${()=>this._startEditProduct(e)}>
                <span class="row-name">${e.name}</span>
                <span class="row-sub">
                  ${o?.name??t("no_category")}
                  ${null!=e.default_weight?q` · ${e.default_weight} g`:H}
                </span>
              </button>
              <button
                class="icon-btn"
                title=${t("move_up")}
                ?disabled=${0===i}
                @click=${()=>this._move("product",e.id,-1)}
              >
                <ha-icon icon="mdi:chevron-up"></ha-icon>
              </button>
              <button
                class="icon-btn"
                title=${t("move_down")}
                ?disabled=${i===this.products.length-1}
                @click=${()=>this._move("product",e.id,1)}
              >
                <ha-icon icon="mdi:chevron-down"></ha-icon>
              </button>
              <button
                class="icon-btn danger"
                title=${t("delete")}
                @click=${()=>this._confirm={text:t("delete_product_confirm",{name:e.name}),action:()=>async function(t,e){await t.callWS({type:`${zt}/product/delete`,product_id:e})}(this.hass,e.id)}}
              >
                <ha-icon icon="mdi:delete-outline"></ha-icon>
              </button>
            </div>
          `})}
      </div>
    `}_renderCategoryForm(){const t=this.localize,e=this._editing;return q`
      <h2 class="view-title">
        ${e.category?e.category.name:t("add_category")}
      </h2>
      ${this._error?q`<div class="error-banner">${this._error}</div>`:H}
      <div class="field">
        <label>${t("name")}</label>
        <input
          type="text"
          .value=${this._fName}
          @input=${t=>this._fName=t.target.value}
        />
      </div>
      <div class="field">
        <label>${t("icon")} <span class="opt">(🍗 / mdi:…)</span></label>
        <input
          type="text"
          .value=${this._fIcon}
          @input=${t=>this._fIcon=t.target.value}
        />
      </div>
      <div class="field">
        <label>${t("color")}</label>
        <div class="swatches">
          <button
            class="swatch none ${null===this._fColor?"selected":""}"
            title="—"
            @click=${()=>this._fColor=null}
          >
            ✕
          </button>
          ${$e.map(t=>q`
              <button
                class="swatch ${this._fColor===t?"selected":""}"
                style="background:${t}"
                title=${t}
                @click=${()=>this._fColor=t}
              ></button>
            `)}
        </div>
      </div>
      <div class="field">
        <label>${t("max_months")} <span class="opt">(${t("optional")})</span></label>
        <input
          type="number"
          min="1"
          step="1"
          .value=${this._fMaxMonths}
          @input=${t=>this._fMaxMonths=t.target.value}
        />
      </div>
      ${e.category?this._renderEnabledToggle():H}
      <div class="row-of-buttons">
        <button
          class="btn btn-primary"
          ?disabled=${this._busy||!this._fName.trim()}
          @click=${this._saveCategory}
        >
          ${t("save")}
        </button>
        <button class="btn btn-outline" @click=${()=>this._editing=null}>
          ${t("cancel")}
        </button>
      </div>
    `}_renderProductForm(){const t=this.localize,e=this._editing;return q`
      <h2 class="view-title">
        ${e.product?e.product.name:t("add_product_btn")}
      </h2>
      ${this._error?q`<div class="error-banner">${this._error}</div>`:H}
      <div class="field">
        <label>${t("name")}</label>
        <input
          type="text"
          .value=${this._fName}
          @input=${t=>this._fName=t.target.value}
        />
      </div>
      <div class="field">
        <label>${t("category")}</label>
        <select
          .value=${this._fCategoryId}
          @change=${t=>this._fCategoryId=t.target.value}
        >
          <option value="" ?selected=${!this._fCategoryId}>
            ${t("no_category")}
          </option>
          ${this.categories.map(t=>q`
              <option
                value=${t.id}
                ?selected=${t.id===this._fCategoryId}
              >
                ${t.name}
              </option>
            `)}
        </select>
      </div>
      <div class="field">
        <label>${t("icon")} <span class="opt">(🍗 / mdi:…)</span></label>
        <input
          type="text"
          .value=${this._fIcon}
          @input=${t=>this._fIcon=t.target.value}
        />
      </div>
      <div class="field">
        <label>${t("default_weight")} <span class="opt">(${t("optional")})</span></label>
        <input
          type="number"
          min="1"
          step="1"
          .value=${this._fDefaultWeight}
          @input=${t=>this._fDefaultWeight=t.target.value}
        />
      </div>
      <div class="field">
        <label>${t("quick_weights")}</label>
        <input
          type="text"
          placeholder="250, 500, 750, 1000"
          .value=${this._fQuickWeights}
          @input=${t=>this._fQuickWeights=t.target.value}
        />
      </div>
      <div class="field">
        <label>${t("quick_pieces")}</label>
        <input
          type="text"
          placeholder="1, 2, 3, 4, 6"
          .value=${this._fQuickPieces}
          @input=${t=>this._fQuickPieces=t.target.value}
        />
      </div>
      <label class="toggle-row">
        <input
          type="checkbox"
          .checked=${this._fAskForWeight}
          @change=${t=>this._fAskForWeight=t.target.checked}
        />
        ${t("ask_for_weight")}
      </label>
      ${e.product?this._renderEnabledToggle():H}
      <div class="row-of-buttons">
        <button
          class="btn btn-primary"
          ?disabled=${this._busy||!this._fName.trim()}
          @click=${this._saveProduct}
        >
          ${t("save")}
        </button>
        <button class="btn btn-outline" @click=${()=>this._editing=null}>
          ${t("cancel")}
        </button>
      </div>
    `}_renderEnabledToggle(){return q`
      <label class="toggle-row">
        <input
          type="checkbox"
          .checked=${this._fEnabled}
          @change=${t=>this._fEnabled=t.target.checked}
        />
        ${this.localize("enabled")}
      </label>
    `}static{this.styles=[kt,r`
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
    `]}}function xe(t,e){if(t>=1e3){const i=t/1e3;return`${(Math.round(10*i)/10).toLocaleString("cs"===e?"cs-CZ":"en-US")} kg`}return`${t} g`}t([dt({attribute:!1})],we.prototype,"hass",void 0),t([dt({attribute:!1})],we.prototype,"localize",void 0),t([dt({attribute:!1})],we.prototype,"categories",void 0),t([dt({attribute:!1})],we.prototype,"products",void 0),t([ut()],we.prototype,"_tab",void 0),t([ut()],we.prototype,"_editing",void 0),t([ut()],we.prototype,"_confirm",void 0),t([ut()],we.prototype,"_error",void 0),t([ut()],we.prototype,"_busy",void 0),t([ut()],we.prototype,"_fName",void 0),t([ut()],we.prototype,"_fIcon",void 0),t([ut()],we.prototype,"_fCategoryId",void 0),t([ut()],we.prototype,"_fDefaultWeight",void 0),t([ut()],we.prototype,"_fQuickWeights",void 0),t([ut()],we.prototype,"_fQuickPieces",void 0),t([ut()],we.prototype,"_fAskForWeight",void 0),t([ut()],we.prototype,"_fEnabled",void 0),t([ut()],we.prototype,"_fMaxMonths",void 0),t([ut()],we.prototype,"_fColor",void 0),customElements.define("fi-manage-view",we);class ke extends at{constructor(){super(...arguments),this.stats=null,this.categories=[],this.language="en",this.monthsShown=6}_category(t){return t?this.categories.find(e=>e.id===t):void 0}render(){const t=this.localize;if(!this.stats)return H;const{current:e,monthly:i}=this.stats,o=Math.max(1,...e.categories.map(t=>t.weight)),s=i.slice(-this.monthsShown),n=Math.max(1,...s.flatMap(t=>[t.added_weight,t.removed_weight]));return q`
      <div class="tiles-row">
        <div class="stat-tile">
          <span class="stat-value">${e.item_count}</span>
          <span class="stat-label">${t("stats_items")}</span>
        </div>
        <div class="stat-tile">
          <span class="stat-value"
            >${xe(e.total_weight,this.language)}</span
          >
          <span class="stat-label">${t("stats_weight")}</span>
        </div>
        <div class="stat-tile">
          <span class="stat-value">
            ${null!=e.avg_age_months?t("months_old",{months:e.avg_age_months}):"–"}
          </span>
          <span class="stat-label">${t("stats_avg_age")}</span>
        </div>
      </div>

      ${e.oldest_item?q`
            <p class="oldest">
              ${t("stats_oldest")}:
              <strong>
                ${e.oldest_item.name} ·
                ${String(e.oldest_item.month).padStart(2,"0")}/${e.oldest_item.year}
              </strong>
            </p>
          `:H}

      ${e.categories.length?q`
            <h3 class="section-title">${t("stats_by_category")}</h3>
            <div class="category-bars">
              ${e.categories.map(e=>{const i=this._category(e.category_id),s=i?.color??"var(--fi-accent)",n=Math.max(4,Math.round(e.weight/o*100));return q`
                  <div class="category-row">
                    <span class="avatar small" style=${yt(i?.color)}>
                      ${bt(i?.icon,"mdi:snowflake")}
                    </span>
                    <div class="category-main">
                      <div class="category-head">
                        <span class="category-name"
                          >${i?.name??e.category_name??t("uncategorized")}</span
                        >
                        <span class="category-value">
                          ${e.weight?xe(e.weight,this.language):""}
                          · ${e.count}
                        </span>
                      </div>
                      <div class="bar-track">
                        <div
                          class="bar-fill"
                          style="width:${n}%;background:${s}"
                        ></div>
                      </div>
                    </div>
                  </div>
                `})}
            </div>
          `:H}

      ${s.length?q`
            <h3 class="section-title">${t("stats_monthly")}</h3>
            <div class="chart" role="img" aria-label=${t("stats_monthly")}>
              ${s.map(e=>q`
                  <div class="month">
                    <div class="bars">
                      <div
                        class="bar added"
                        title="${t("stats_added")}: ${xe(e.added_weight,this.language)}"
                        style="height:${Math.round(e.added_weight/n*100)}%"
                      ></div>
                      <div
                        class="bar removed"
                        title="${t("stats_removed")}: ${xe(e.removed_weight,this.language)}"
                        style="height:${Math.round(e.removed_weight/n*100)}%"
                      ></div>
                    </div>
                    <span class="month-label"
                      >${e.month.slice(5)}/${e.month.slice(2,4)}</span
                    >
                  </div>
                `)}
            </div>
            <div class="legend">
              <span><i class="dot added"></i>${t("stats_added")}</span>
              <span><i class="dot removed"></i>${t("stats_removed")}</span>
            </div>
          `:H}
    `}static{this.styles=[kt,r`
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
    `]}}t([dt({attribute:!1})],ke.prototype,"stats",void 0),t([dt({attribute:!1})],ke.prototype,"categories",void 0),t([dt({attribute:!1})],ke.prototype,"localize",void 0),t([dt({attribute:!1})],ke.prototype,"language",void 0),t([dt({attribute:!1})],ke.prototype,"monthsShown",void 0),customElements.define("fi-stats-view",ke);const ze="main_freezer";console.info("%c FREEZER-INVENTORY-CARD %c 1.1.0 ","color: white; background: #03a9f4; font-weight: 700;","color: #03a9f4; background: white; font-weight: 700;");class Ae extends at{constructor(){super(...arguments),this._config={type:""},this._items=[],this._products=[],this._categories=[],this._integration=null,this._dialogOpen=!1,this._view="list",this._selectedItem=null,this._pickedProduct=null,this._customProduct=!1,this._errorText="",this._busy=!1,this._toast=null,this._loaded=!1,this._connectionError="",this._freezers=[],this._stats=null,this._initStarted=!1,this._focusPending=!1,this._historyPushed=!1,this._onPopstate=()=>{this._historyPushed=!1,this._dialogOpen&&("list"!==this._view&&"list"!==this._config.display_mode?(this._backToList(),window.history.pushState({freezerInventoryDialog:!0},""),this._historyPushed=!0):this._closeDialog(!0))},this._onDialogKeydown=t=>{this._resetAutoClose(),"Escape"===t.key&&(t.stopPropagation(),this._closeDialog())}}static getConfigElement(){return Promise.resolve().then(function(){return Ce}),document.createElement("freezer-inventory-card-editor")}static getStubConfig(){return{freezer_id:ze,display_mode:"popup",touch_mode:!0}}setConfig(t){this._config={...t}}getCardSize(){return"list"===this._config.display_mode?6:2}getGridOptions(){return"list"===this._config.display_mode?{rows:8,columns:12,min_rows:4}:{rows:2,columns:6,min_rows:1}}connectedCallback(){super.connectedCallback(),xt(),this._maybeInit()}disconnectedCallback(){super.disconnectedCallback(),this._unsub?.then(t=>t()).catch(()=>{}),this._unsub=void 0,this._initStarted=!1,this._toastTimer&&clearTimeout(this._toastTimer),this._autoCloseTimer&&clearTimeout(this._autoCloseTimer),this._lockPageOverscroll(!1),window.removeEventListener("popstate",this._onPopstate)}_resetAutoClose(){this._autoCloseTimer&&clearTimeout(this._autoCloseTimer);const t=Number(this._config.auto_close)||0;t>0&&this._dialogOpen&&(this._autoCloseTimer=setTimeout(()=>{this._dialogOpen&&this._closeDialog()},1e3*t))}updated(){this._maybeInit(),this._focusPending&&this._dialogOpen&&(this._focusPending=!1,this.renderRoot.querySelector(".overlay-card")?.focus())}get _freezerId(){return this._config.freezer_id||ze}get _localize(){return function(t){const e=_t[t]??pt;return(t,i)=>{let o=e[t]??pt[t]??t;if(i)for(const[t,e]of Object.entries(i))o=o.replaceAll(`{${t}}`,String(e));return o}}(this._config.language||this._integration?.language||("cs"===this.hass?.locale?.language?"cs":"en"))}get _touchMode(){return!1!==this._config.touch_mode}get _oldMonths(){return this._config.old_months??this._integration?.old_months??6}async _maybeInit(){if(!this._initStarted&&this.hass&&this.isConnected){this._initStarted=!0;try{const[i,o,s,n]=await Promise.all([At(this.hass),Et(this.hass),St(this.hass),Ct(this.hass)]);this._integration=i,this._products=o,this._categories=s,this._freezers=n,"stats"===this._config.display_mode&&(this._stats=await Tt(this.hass,this._freezerId)),this._unsub=(t=this.hass,e=t=>this._handleUpdate(t),t.connection.subscribeMessage(e,{type:`${zt}/subscribe_updates`})),await this._unsub,this._loaded=!0,this._connectionError=""}catch(t){this._connectionError=Mt(t,"Freezer Inventory not available"),this._initStarted=!1}var t,e}}async _handleUpdate(t){if("freezers"===t.type&&this.hass)this._freezers=await Ct(this.hass);else if("items"===t.type){if("stats"===this._config.display_mode&&this.hass&&(this._stats=await Tt(this.hass,this._freezerId)),t.freezer_id!==this._freezerId)return;if(this._items=t.items,this._loaded=!0,this._selectedItem){const e=t.items.find(t=>t.id===this._selectedItem.id);e?this._selectedItem=e:"remove"!==this._view&&"amount"!==this._view||(this._selectedItem=null,this._view="list")}}else if("catalog"===t.type&&this.hass){const[t,e]=await Promise.all([Et(this.hass),St(this.hass)]);this._products=t,this._categories=e}}get _sortedItems(){return"newest_first"===this._config.sort?[...this._items].reverse():this._items}_showToast(t,e=null){this._toastTimer&&clearTimeout(this._toastTimer),this._toast={text:t,undo:e},this._toastTimer=setTimeout(()=>this._toast=null,6e3)}async _undo(){const t=this._toast?.undo;if(this._toast=null,t&&this.hass)try{if("remove"===t.kind)await async function(t,e,i){await t.callWS({type:`${zt}/restore_item`,freezer_id:e,item:i})}(this.hass,this._freezerId,t.item);else{const e={};null!=t.previousWeight&&(e.weight=t.previousWeight),null!=t.previousPieces&&(e.pieces=t.previousPieces),Object.keys(e).length&&await Pt(this.hass,this._freezerId,t.item.id,e)}}catch(t){this._showToast(Mt(t,this._localize("err_generic")))}}_lockPageOverscroll(t){const e=document.documentElement.style,i=document.body.style;t&&!this._prevOverscroll?(this._prevOverscroll={html:e.overscrollBehaviorY,body:i.overscrollBehaviorY},e.overscrollBehaviorY="none",i.overscrollBehaviorY="none"):!t&&this._prevOverscroll&&(e.overscrollBehaviorY=this._prevOverscroll.html,i.overscrollBehaviorY=this._prevOverscroll.body,this._prevOverscroll=void 0)}_openDialog(t="list"){this._view=t,this._errorText="",this._dialogOpen=!0,this._focusPending=!0,this._lockPageOverscroll(!0),this._historyPushed||(window.history.pushState({freezerInventoryDialog:!0},""),this._historyPushed=!0,window.addEventListener("popstate",this._onPopstate)),this._resetAutoClose()}_closeDialog(t=!1){this._dialogOpen=!1,this._view="list",this._selectedItem=null,this._pickedProduct=null,this._customProduct=!1,this._errorText="",this._lockPageOverscroll(!1),this._autoCloseTimer&&clearTimeout(this._autoCloseTimer),window.removeEventListener("popstate",this._onPopstate),this._historyPushed&&!t&&(this._historyPushed=!1,window.history.back())}_backToList(){this._view="list",this._selectedItem=null,this._pickedProduct=null,this._customProduct=!1,this._errorText="","list"===this._config.display_mode&&(this._dialogOpen=!1)}async _mutate(t,e){if(this.hass){this._busy=!0,this._errorText="";try{return await t(),!0}catch(t){return this._errorText=Mt(t,e),!1}finally{this._busy=!1}}}async _onFormSubmit(t){const e=t.detail.result,i=this._localize;if("edit"===this._view&&this._selectedItem){const t=this._selectedItem;await this._mutate(()=>Pt(this.hass,this._freezerId,t.id,{product_name:e.product_name,month:e.month,year:e.year,weight:e.weight,original_weight:e.original_weight??null,pieces:e.pieces,note:e.note}),i("err_generic"))&&(this._backToList(),this._showToast(i("item_updated")))}else{if(await this._mutate(()=>async function(t,e){await t.callService(zt,"add_item",e)}(this.hass,{freezer_id:this._freezerId,product_id:this._customProduct?void 0:this._pickedProduct?.id,product_name:e.product_name,month:e.month,year:e.year,weight:e.weight??void 0,pieces:e.pieces??void 0,note:e.note||void 0,quantity:e.quantity}),i("err_add_failed"))){const t=[e.product_name,`${String(e.month).padStart(2,"0")}/${e.year}`,null!=e.weight?`${e.weight} g`:null,null!=e.pieces?`${e.pieces} ${i("pieces_short")}`:null].filter(Boolean).join(" · "),o=e.quantity>1?`${e.quantity}× `:"";this._backToList(),this._showToast(`${i("added_confirmation")} ${o}${t}`)}}}async _onRemoveAll(){const t=this._selectedItem;if(!t)return;const e=this._localize;await this._mutate(()=>async function(t,e,i){await t.callService(zt,"remove_item",{freezer_id:e,item_id:i})}(this.hass,this._freezerId,t.id),e("err_generic"))&&(this._backToList(),this._showToast(e("item_removed"),{kind:"remove",item:t,label:mt(t,e)}))}async _onRemoveHalf(){const t=this._selectedItem;if(!t)return;const e=this._localize,i=t.weight??void 0,o=t.pieces??void 0;await this._mutate(()=>async function(t,e,i){await t.callService(zt,"remove_half",{freezer_id:e,item_id:i})}(this.hass,this._freezerId,t.id),e("err_generic"))&&(this._backToList(),this._showToast(e("item_updated"),{kind:"weight",item:t,previousWeight:i,previousPieces:o,label:mt(t,e)}))}async _onRemoveAmount(t){const e=this._selectedItem;if(!e)return;const i=this._localize,{amount:o,pieces:s}=t.detail,n=e.weight??void 0,r=e.pieces??void 0,a=null!=o&&o===e.weight||null!=s&&s===e.pieces;await this._mutate(()=>async function(t,e,i,o){await t.callService(zt,"remove_amount",{freezer_id:e,item_id:i,...o})}(this.hass,this._freezerId,e.id,{amount:o??void 0,pieces:s??void 0}),i("err_generic"))&&(this._backToList(),this._showToast(i(a?"item_removed":"item_updated"),a?{kind:"remove",item:e,label:mt(e,i)}:{kind:"weight",item:e,previousWeight:n,previousPieces:r,label:mt(e,i)}))}async _onFormRemove(){await this._onRemoveAll()}async _onMoveTo(t){const e=this._selectedItem;if(!e)return;const i=this._localize;await this._mutate(()=>async function(t,e,i,o){await t.callService(zt,"move_item",{item_id:e,source_freezer_id:i,target_freezer_id:o})}(this.hass,e.id,this._freezerId,t.id),i("err_generic"))&&(this._backToList(),this._showToast(i("item_moved",{name:t.name})))}_onScanFound(t){const e=this._items.find(e=>e.id===t.detail.itemId);e?(this._selectedItem=e,this._view="remove",this._errorText=""):(this._backToList(),this._showToast(this._localize("scan_not_found")))}render(){if(this._connectionError&&!this._loaded)return q`<ha-card>
        <div class="error-banner card-error">${this._connectionError}</div>
      </ha-card>`;if("stats"===this._config.display_mode)return q`${this._renderStats()} ${this._renderToast()}`;const t="list"===this._config.display_mode;return q`
      ${t?this._renderInlineList():this._renderTile()}
      ${this._renderDialog()} ${this._renderToast()}
    `}_renderStats(){const t=this._localize,e=this._config.name||this._friendlyName();return q`
      <ha-card>
        <div class="inline-header">
          <span class="avatar tile-avatar">
            ${bt(this._config.icon,"mdi:chart-box-outline")}
          </span>
          <span class="tile-text">
            <span class="tile-name">${e}</span>
            <span class="tile-count">${t("stats_monthly")}</span>
          </span>
        </div>
        <div class="inline-body">
          <fi-stats-view
            ?touch=${this._touchMode}
            .stats=${this._stats}
            .categories=${this._categories}
            .localize=${t}
            .language=${this._config.language||this._integration?.language||"en"}
          ></fi-stats-view>
        </div>
      </ha-card>
    `}_renderTile(){const t=this._localize,e=this._config.name||this._friendlyName(),i=this._items.length;return q`
      <ha-card>
        <button class="tile" @click=${()=>this._openDialog("list")}>
          <span class="avatar tile-avatar">
            ${bt(this._config.icon,"mdi:snowflake")}
          </span>
          <span class="tile-text">
            <span class="tile-name">${e}</span>
            ${!1!==this._config.show_count?q`<span class="tile-count"
                  >${ft(t,i)}</span
                >`:H}
          </span>
        </button>
      </ha-card>
    `}_renderInlineList(){const t=this._localize,e=this._config.name||this._friendlyName();return q`
      <ha-card>
        <div class="inline-header">
          <span class="avatar tile-avatar">
            ${bt(this._config.icon,"mdi:snowflake")}
          </span>
          <span class="tile-text">
            <span class="tile-name">${e}</span>
            ${!1!==this._config.show_count?q`<span class="tile-count"
                  >${ft(t,this._items.length)}</span
                >`:H}
          </span>
        </div>
        <div class="inline-body">${this._renderListView()}</div>
      </ha-card>
    `}_friendlyName(){return"en"===this._integration?.language?"Freezer":"Mrazák"}_renderListView(){return q`
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
        @fi-select-item=${t=>{this._selectedItem=t.detail.item,this._openDialog("remove")}}
      ></fi-list-view>
    `}_renderCurrentView(){const t=this._localize;switch(this._view){case"picker":return q`
          <fi-product-picker
            ?touch=${this._touchMode}
            .products=${this._products}
            .categories=${this._categories}
            .localize=${t}
            @fi-pick-product=${t=>{this._pickedProduct=t.detail.product,this._customProduct=!1,this._view="form",this._errorText=""}}
            @fi-pick-other=${()=>{this._pickedProduct=null,this._customProduct=!0,this._view="form",this._errorText=""}}
          ></fi-product-picker>
        `;case"form":case"edit":return q`
          <fi-item-form
            ?touch=${this._touchMode}
            .localize=${t}
            .product=${"edit"===this._view?null:this._pickedProduct}
            .item=${"edit"===this._view?this._selectedItem:null}
            .submitting=${this._busy}
            .errorText=${this._errorText}
            @fi-form-submit=${this._onFormSubmit}
            @fi-form-cancel=${()=>this._backToList()}
            @fi-form-remove=${this._onFormRemove}
          ></fi-item-form>
        `;case"remove":case"amount":return this._selectedItem?q`
          <fi-remove-dialog
            ?touch=${this._touchMode}
            .localize=${t}
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
            @fi-print-label=${()=>this._selectedItem&&ce([this._selectedItem],t)}
            @fi-remove-cancel=${()=>"amount"===this._view?(this._view="remove",this._errorText=""):this._backToList()}
          ></fi-remove-dialog>
        `:this._renderListView();case"move":return this._selectedItem?q`
          <h2 class="view-title">${t("move_where")}</h2>
          ${this._errorText?q`<div class="error-banner">${this._errorText}</div>`:H}
          <div class="row-of-buttons">
            ${this._freezers.filter(t=>t.id!==this._freezerId).map(t=>q`
                  <button
                    class="btn btn-outline"
                    ?disabled=${this._busy}
                    @click=${()=>this._onMoveTo(t)}
                  >
                    ${t.name}
                  </button>
                `)}
            <button
              class="btn btn-quiet"
              @click=${()=>{this._view="remove",this._errorText=""}}
            >
              ${t("cancel")}
            </button>
          </div>
        `:this._renderListView();case"scan":return q`
          <fi-scan-view
            ?touch=${this._touchMode}
            .localize=${t}
            @fi-scan-found=${this._onScanFound}
            @fi-scan-cancel=${()=>this._backToList()}
          ></fi-scan-view>
        `;case"manage":return q`
          <fi-manage-view
            ?touch=${this._touchMode}
            .hass=${this.hass}
            .localize=${t}
            .categories=${this._categories}
            .products=${this._products}
            @fi-print-all=${()=>ce(this._items,t)}
            @fi-manage-close=${()=>this._backToList()}
          ></fi-manage-view>
        `;default:return this._renderListView()}}_renderDialog(){if(!this._dialogOpen)return H;const t=this._localize,e=this._config.name||this._friendlyName();return q`
      <div
        class="overlay"
        role="dialog"
        aria-modal="true"
        aria-label=${e}
        @keydown=${this._onDialogKeydown}
        @pointerdown=${t=>{this._resetAutoClose(),t.target===t.currentTarget&&this._closeDialog()}}
        @input=${()=>this._resetAutoClose()}
      >
        <div
          class="overlay-card ${this._touchMode?"touch":""}"
          tabindex="-1"
        >
          <div class="dialog-header">
            <h1 class="dialog-title">${e}</h1>
            <button
              class="close-btn"
              aria-label=${t("close")}
              @click=${()=>this._closeDialog()}
            >
              <ha-icon icon="mdi:close"></ha-icon>
            </button>
          </div>
          <div class="dialog-content">${this._renderCurrentView()}</div>
        </div>
      </div>
    `}_renderToast(){return this._toast?q`
      <div class="toast" role="status">
        <span class="toast-text">${this._toast.text}</span>
        ${this._toast.undo?q`
              <button class="toast-undo" @click=${()=>this._undo()}>
                ${this._localize("undo")}
              </button>
            `:H}
      </div>
    `:H}static{this.styles=[kt,r`
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
    `]}}t([dt({attribute:!1})],Ae.prototype,"hass",void 0),t([ut()],Ae.prototype,"_config",void 0),t([ut()],Ae.prototype,"_items",void 0),t([ut()],Ae.prototype,"_products",void 0),t([ut()],Ae.prototype,"_categories",void 0),t([ut()],Ae.prototype,"_integration",void 0),t([ut()],Ae.prototype,"_dialogOpen",void 0),t([ut()],Ae.prototype,"_view",void 0),t([ut()],Ae.prototype,"_selectedItem",void 0),t([ut()],Ae.prototype,"_pickedProduct",void 0),t([ut()],Ae.prototype,"_customProduct",void 0),t([ut()],Ae.prototype,"_errorText",void 0),t([ut()],Ae.prototype,"_busy",void 0),t([ut()],Ae.prototype,"_toast",void 0),t([ut()],Ae.prototype,"_loaded",void 0),t([ut()],Ae.prototype,"_connectionError",void 0),t([ut()],Ae.prototype,"_freezers",void 0),t([ut()],Ae.prototype,"_stats",void 0),customElements.define("freezer-inventory-card",Ae),window.customCards=window.customCards||[],window.customCards.push({type:"freezer-inventory-card",name:"Freezer Inventory Card",description:"Touch-friendly freezer inventory card for the Freezer Inventory integration.",preview:!1,documentationURL:"https://github.com/nikopol666/homeassistant-freezer-inventory"});const Ee={cs:{freezer_id:"Mrazák",name:"Název (nepovinné)",icon:"Ikona",display_mode:"Režim zobrazení",popup:"Dlaždice s popupem",list:"Přímý seznam",stats:"Statistiky",touch_mode:"Tabletový režim (větší prvky)",show_count:"Zobrazit počet položek",show_weight:"Zobrazovat hmotnost",show_note:"Zobrazovat poznámku",sort:"Řazení",oldest_first:"Od nejstarších",newest_first:"Od nejnovějších",old_months:"Zvýraznit starší než (měsíců)",language:"Jazyk karty",lang_auto:"Podle integrace",auto_close:"Automaticky zavřít po nečinnosti (sekundy, prázdné = vypnuto)"},en:{freezer_id:"Freezer",name:"Name (optional)",icon:"Icon",display_mode:"Display mode",popup:"Tile with popup",list:"Inline list",stats:"Statistics",touch_mode:"Tablet mode (larger elements)",show_count:"Show item count",show_weight:"Show weight",show_note:"Show note",sort:"Sorting",oldest_first:"Oldest first",newest_first:"Newest first",old_months:"Highlight older than (months)",language:"Card language",lang_auto:"Follow integration",auto_close:"Auto-close after inactivity (seconds, empty = off)"}};class Se extends at{constructor(){super(...arguments),this._config={type:""},this._freezers=[]}setConfig(t){this._config={...t}}connectedCallback(){super.connectedCallback(),xt(),this._loadFreezers()}async _loadFreezers(){if(this.hass)try{this._freezers=await Ct(this.hass)}catch{this._freezers=[]}}get _t(){const t="cs"===this.hass?.locale?.language?"cs":"en";return Ee[t]}_update(t){this._config={...this._config,...t};for(const[t,e]of Object.entries(this._config))void 0===e&&delete this._config[t];$t(this,"config-changed",{config:this._config})}render(){if(!this.hass)return q``;const t=this._t,e=this._config;return q`
      <div class="editor">
        <div class="field">
          <label>${t.freezer_id}</label>
          <select
            .value=${e.freezer_id??"main_freezer"}
            @change=${t=>this._update({freezer_id:t.target.value})}
          >
            ${(this._freezers.length?this._freezers:[{id:"main_freezer",name:"main_freezer"}]).map(t=>q`
                <option
                  value=${t.id}
                  ?selected=${(e.freezer_id??"main_freezer")===t.id}
                >
                  ${t.name}
                </option>
              `)}
          </select>
        </div>

        <div class="field">
          <label>${t.name}</label>
          <input
            type="text"
            .value=${e.name??""}
            @input=${t=>this._update({name:t.target.value||void 0})}
          />
        </div>

        <div class="field">
          <label>${t.icon}</label>
          <input
            type="text"
            placeholder="mdi:snowflake"
            .value=${e.icon??""}
            @input=${t=>this._update({icon:t.target.value||void 0})}
          />
        </div>

        <div class="field">
          <label>${t.display_mode}</label>
          <select
            .value=${e.display_mode??"popup"}
            @change=${t=>this._update({display_mode:t.target.value})}
          >
            <option value="popup" ?selected=${"popup"===(e.display_mode??"popup")}>
              ${t.popup}
            </option>
            <option value="list" ?selected=${"list"===e.display_mode}>
              ${t.list}
            </option>
            <option value="stats" ?selected=${"stats"===e.display_mode}>
              ${t.stats}
            </option>
          </select>
        </div>

        <div class="field">
          <label>${t.sort}</label>
          <select
            .value=${e.sort??"oldest_first"}
            @change=${t=>this._update({sort:t.target.value})}
          >
            <option
              value="oldest_first"
              ?selected=${"oldest_first"===(e.sort??"oldest_first")}
            >
              ${t.oldest_first}
            </option>
            <option value="newest_first" ?selected=${"newest_first"===e.sort}>
              ${t.newest_first}
            </option>
          </select>
        </div>

        <div class="field">
          <label>${t.old_months}</label>
          <input
            type="number"
            min="1"
            step="1"
            .value=${null!=e.old_months?String(e.old_months):""}
            @input=${t=>{const e=t.target.value.trim(),i=Number(e);this._update({old_months:e&&Number.isInteger(i)&&i>0?i:void 0})}}
          />
        </div>

        <div class="field">
          <label>${t.auto_close}</label>
          <input
            type="number"
            min="5"
            step="5"
            .value=${null!=e.auto_close?String(e.auto_close):""}
            @input=${t=>{const e=t.target.value.trim(),i=Number(e);this._update({auto_close:e&&Number.isFinite(i)&&i>0?Math.round(i):void 0})}}
          />
        </div>

        <div class="field">
          <label>${t.language}</label>
          <select
            .value=${e.language??""}
            @change=${t=>{const e=t.target.value;this._update({language:e||void 0})}}
          >
            <option value="" ?selected=${!e.language}>${t.lang_auto}</option>
            <option value="cs" ?selected=${"cs"===e.language}>Čeština</option>
            <option value="en" ?selected=${"en"===e.language}>English</option>
          </select>
        </div>

        ${[["touch_mode",t.touch_mode],["show_count",t.show_count],["show_weight",t.show_weight],["show_note",t.show_note]].map(([t,e])=>q`
            <label class="toggle-row">
              <input
                type="checkbox"
                .checked=${!1!==this._config[t]}
                @change=${e=>this._update({[t]:!!e.target.checked&&void 0})}
              />
              ${e}
            </label>
          `)}
      </div>
    `}static{this.styles=r`
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
  `}}t([dt({attribute:!1})],Se.prototype,"hass",void 0),t([ut()],Se.prototype,"_config",void 0),t([ut()],Se.prototype,"_freezers",void 0),customElements.define("freezer-inventory-card-editor",Se);var Ce=Object.freeze({__proto__:null});
