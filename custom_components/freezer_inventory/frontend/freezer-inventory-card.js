function t(t,e,i,o){var s,r=arguments.length,n=r<3?e:null===o?o=Object.getOwnPropertyDescriptor(e,i):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)n=Reflect.decorate(t,e,i,o);else for(var a=t.length-1;a>=0;a--)(s=t[a])&&(n=(r<3?s(n):r>3?s(e,i,n):s(e,i))||n);return r>3&&n&&Object.defineProperty(e,i,n),n}"function"==typeof SuppressedError&&SuppressedError;const e=globalThis,i=e.ShadowRoot&&(void 0===e.ShadyCSS||e.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,o=Symbol(),s=new WeakMap;let r=class{constructor(t,e,i){if(this._$cssResult$=!0,i!==o)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=e}get styleSheet(){let t=this.o;const e=this.t;if(i&&void 0===t){const i=void 0!==e&&1===e.length;i&&(t=s.get(e)),void 0===t&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),i&&s.set(e,t))}return t}toString(){return this.cssText}};const n=(t,...e)=>{const i=1===t.length?t[0]:e.reduce((e,i,o)=>e+(t=>{if(!0===t._$cssResult$)return t.cssText;if("number"==typeof t)return t;throw Error("Value passed to 'css' function must be a 'css' function result: "+t+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(i)+t[o+1],t[0]);return new r(i,t,o)},a=i?t=>t:t=>t instanceof CSSStyleSheet?(t=>{let e="";for(const i of t.cssRules)e+=i.cssText;return(t=>new r("string"==typeof t?t:t+"",void 0,o))(e)})(t):t,{is:l,defineProperty:c,getOwnPropertyDescriptor:h,getOwnPropertyNames:d,getOwnPropertySymbols:p,getPrototypeOf:u}=Object,_=globalThis,m=_.trustedTypes,g=m?m.emptyScript:"",f=_.reactiveElementPolyfillSupport,v=(t,e)=>t,b={toAttribute(t,e){switch(e){case Boolean:t=t?g:null;break;case Object:case Array:t=null==t?t:JSON.stringify(t)}return t},fromAttribute(t,e){let i=t;switch(e){case Boolean:i=null!==t;break;case Number:i=null===t?null:Number(t);break;case Object:case Array:try{i=JSON.parse(t)}catch(t){i=null}}return i}},$=(t,e)=>!l(t,e),y={attribute:!0,type:String,converter:b,reflect:!1,useDefault:!1,hasChanged:$};Symbol.metadata??=Symbol("metadata"),_.litPropertyMetadata??=new WeakMap;let w=class extends HTMLElement{static addInitializer(t){this._$Ei(),(this.l??=[]).push(t)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(t,e=y){if(e.state&&(e.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(t)&&((e=Object.create(e)).wrapped=!0),this.elementProperties.set(t,e),!e.noAccessor){const i=Symbol(),o=this.getPropertyDescriptor(t,i,e);void 0!==o&&c(this.prototype,t,o)}}static getPropertyDescriptor(t,e,i){const{get:o,set:s}=h(this.prototype,t)??{get(){return this[e]},set(t){this[e]=t}};return{get:o,set(e){const r=o?.call(this);s?.call(this,e),this.requestUpdate(t,r,i)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)??y}static _$Ei(){if(this.hasOwnProperty(v("elementProperties")))return;const t=u(this);t.finalize(),void 0!==t.l&&(this.l=[...t.l]),this.elementProperties=new Map(t.elementProperties)}static finalize(){if(this.hasOwnProperty(v("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(v("properties"))){const t=this.properties,e=[...d(t),...p(t)];for(const i of e)this.createProperty(i,t[i])}const t=this[Symbol.metadata];if(null!==t){const e=litPropertyMetadata.get(t);if(void 0!==e)for(const[t,i]of e)this.elementProperties.set(t,i)}this._$Eh=new Map;for(const[t,e]of this.elementProperties){const i=this._$Eu(t,e);void 0!==i&&this._$Eh.set(i,t)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(t){const e=[];if(Array.isArray(t)){const i=new Set(t.flat(1/0).reverse());for(const t of i)e.unshift(a(t))}else void 0!==t&&e.push(a(t));return e}static _$Eu(t,e){const i=e.attribute;return!1===i?void 0:"string"==typeof i?i:"string"==typeof t?t.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(t=>this.enableUpdating=t),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(t=>t(this))}addController(t){(this._$EO??=new Set).add(t),void 0!==this.renderRoot&&this.isConnected&&t.hostConnected?.()}removeController(t){this._$EO?.delete(t)}_$E_(){const t=new Map,e=this.constructor.elementProperties;for(const i of e.keys())this.hasOwnProperty(i)&&(t.set(i,this[i]),delete this[i]);t.size>0&&(this._$Ep=t)}createRenderRoot(){const t=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return((t,o)=>{if(i)t.adoptedStyleSheets=o.map(t=>t instanceof CSSStyleSheet?t:t.styleSheet);else for(const i of o){const o=document.createElement("style"),s=e.litNonce;void 0!==s&&o.setAttribute("nonce",s),o.textContent=i.cssText,t.appendChild(o)}})(t,this.constructor.elementStyles),t}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(t=>t.hostConnected?.())}enableUpdating(t){}disconnectedCallback(){this._$EO?.forEach(t=>t.hostDisconnected?.())}attributeChangedCallback(t,e,i){this._$AK(t,i)}_$ET(t,e){const i=this.constructor.elementProperties.get(t),o=this.constructor._$Eu(t,i);if(void 0!==o&&!0===i.reflect){const s=(void 0!==i.converter?.toAttribute?i.converter:b).toAttribute(e,i.type);this._$Em=t,null==s?this.removeAttribute(o):this.setAttribute(o,s),this._$Em=null}}_$AK(t,e){const i=this.constructor,o=i._$Eh.get(t);if(void 0!==o&&this._$Em!==o){const t=i.getPropertyOptions(o),s="function"==typeof t.converter?{fromAttribute:t.converter}:void 0!==t.converter?.fromAttribute?t.converter:b;this._$Em=o;const r=s.fromAttribute(e,t.type);this[o]=r??this._$Ej?.get(o)??r,this._$Em=null}}requestUpdate(t,e,i,o=!1,s){if(void 0!==t){const r=this.constructor;if(!1===o&&(s=this[t]),i??=r.getPropertyOptions(t),!((i.hasChanged??$)(s,e)||i.useDefault&&i.reflect&&s===this._$Ej?.get(t)&&!this.hasAttribute(r._$Eu(t,i))))return;this.C(t,e,i)}!1===this.isUpdatePending&&(this._$ES=this._$EP())}C(t,e,{useDefault:i,reflect:o,wrapped:s},r){i&&!(this._$Ej??=new Map).has(t)&&(this._$Ej.set(t,r??e??this[t]),!0!==s||void 0!==r)||(this._$AL.has(t)||(this.hasUpdated||i||(e=void 0),this._$AL.set(t,e)),!0===o&&this._$Em!==t&&(this._$Eq??=new Set).add(t))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(t){Promise.reject(t)}const t=this.scheduleUpdate();return null!=t&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(const[t,e]of this._$Ep)this[t]=e;this._$Ep=void 0}const t=this.constructor.elementProperties;if(t.size>0)for(const[e,i]of t){const{wrapped:t}=i,o=this[e];!0!==t||this._$AL.has(e)||void 0===o||this.C(e,void 0,i,o)}}let t=!1;const e=this._$AL;try{t=this.shouldUpdate(e),t?(this.willUpdate(e),this._$EO?.forEach(t=>t.hostUpdate?.()),this.update(e)):this._$EM()}catch(e){throw t=!1,this._$EM(),e}t&&this._$AE(e)}willUpdate(t){}_$AE(t){this._$EO?.forEach(t=>t.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(t){return!0}update(t){this._$Eq&&=this._$Eq.forEach(t=>this._$ET(t,this[t])),this._$EM()}updated(t){}firstUpdated(t){}};w.elementStyles=[],w.shadowRootOptions={mode:"open"},w[v("elementProperties")]=new Map,w[v("finalized")]=new Map,f?.({ReactiveElement:w}),(_.reactiveElementVersions??=[]).push("2.1.2");const x=globalThis,k=t=>t,z=x.trustedTypes,E=z?z.createPolicy("lit-html",{createHTML:t=>t}):void 0,A="$lit$",T=`lit$${Math.random().toFixed(9).slice(2)}$`,S="?"+T,P=`<${S}>`,C=document,O=()=>C.createComment(""),I=t=>null===t||"object"!=typeof t&&"function"!=typeof t,M=Array.isArray,N="[ \t\n\f\r]",R=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,D=/-->/g,W=/>/g,U=RegExp(`>|${N}(?:([^\\s"'>=/]+)(${N}*=${N}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`,"g"),j=/'/g,q=/"/g,L=/^(?:script|style|textarea|title)$/i,F=(t=>(e,...i)=>({_$litType$:t,strings:e,values:i}))(1),H=Symbol.for("lit-noChange"),V=Symbol.for("lit-nothing"),Z=new WeakMap,B=C.createTreeWalker(C,129);function Y(t,e){if(!M(t)||!t.hasOwnProperty("raw"))throw Error("invalid template strings array");return void 0!==E?E.createHTML(e):e}const Q=(t,e)=>{const i=t.length-1,o=[];let s,r=2===e?"<svg>":3===e?"<math>":"",n=R;for(let e=0;e<i;e++){const i=t[e];let a,l,c=-1,h=0;for(;h<i.length&&(n.lastIndex=h,l=n.exec(i),null!==l);)h=n.lastIndex,n===R?"!--"===l[1]?n=D:void 0!==l[1]?n=W:void 0!==l[2]?(L.test(l[2])&&(s=RegExp("</"+l[2],"g")),n=U):void 0!==l[3]&&(n=U):n===U?">"===l[0]?(n=s??R,c=-1):void 0===l[1]?c=-2:(c=n.lastIndex-l[2].length,a=l[1],n=void 0===l[3]?U:'"'===l[3]?q:j):n===q||n===j?n=U:n===D||n===W?n=R:(n=U,s=void 0);const d=n===U&&t[e+1].startsWith("/>")?" ":"";r+=n===R?i+P:c>=0?(o.push(a),i.slice(0,c)+A+i.slice(c)+T+d):i+T+(-2===c?e:d)}return[Y(t,r+(t[i]||"<?>")+(2===e?"</svg>":3===e?"</math>":"")),o]};class K{constructor({strings:t,_$litType$:e},i){let o;this.parts=[];let s=0,r=0;const n=t.length-1,a=this.parts,[l,c]=Q(t,e);if(this.el=K.createElement(l,i),B.currentNode=this.el.content,2===e||3===e){const t=this.el.content.firstChild;t.replaceWith(...t.childNodes)}for(;null!==(o=B.nextNode())&&a.length<n;){if(1===o.nodeType){if(o.hasAttributes())for(const t of o.getAttributeNames())if(t.endsWith(A)){const e=c[r++],i=o.getAttribute(t).split(T),n=/([.?@])?(.*)/.exec(e);a.push({type:1,index:s,name:n[2],strings:i,ctor:"."===n[1]?et:"?"===n[1]?it:"@"===n[1]?ot:tt}),o.removeAttribute(t)}else t.startsWith(T)&&(a.push({type:6,index:s}),o.removeAttribute(t));if(L.test(o.tagName)){const t=o.textContent.split(T),e=t.length-1;if(e>0){o.textContent=z?z.emptyScript:"";for(let i=0;i<e;i++)o.append(t[i],O()),B.nextNode(),a.push({type:2,index:++s});o.append(t[e],O())}}}else if(8===o.nodeType)if(o.data===S)a.push({type:2,index:s});else{let t=-1;for(;-1!==(t=o.data.indexOf(T,t+1));)a.push({type:7,index:s}),t+=T.length-1}s++}}static createElement(t,e){const i=C.createElement("template");return i.innerHTML=t,i}}function J(t,e,i=t,o){if(e===H)return e;let s=void 0!==o?i._$Co?.[o]:i._$Cl;const r=I(e)?void 0:e._$litDirective$;return s?.constructor!==r&&(s?._$AO?.(!1),void 0===r?s=void 0:(s=new r(t),s._$AT(t,i,o)),void 0!==o?(i._$Co??=[])[o]=s:i._$Cl=s),void 0!==s&&(e=J(t,s._$AS(t,e.values),s,o)),e}class G{constructor(t,e){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){const{el:{content:e},parts:i}=this._$AD,o=(t?.creationScope??C).importNode(e,!0);B.currentNode=o;let s=B.nextNode(),r=0,n=0,a=i[0];for(;void 0!==a;){if(r===a.index){let e;2===a.type?e=new X(s,s.nextSibling,this,t):1===a.type?e=new a.ctor(s,a.name,a.strings,this,t):6===a.type&&(e=new st(s,this,t)),this._$AV.push(e),a=i[++n]}r!==a?.index&&(s=B.nextNode(),r++)}return B.currentNode=C,o}p(t){let e=0;for(const i of this._$AV)void 0!==i&&(void 0!==i.strings?(i._$AI(t,i,e),e+=i.strings.length-2):i._$AI(t[e])),e++}}class X{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(t,e,i,o){this.type=2,this._$AH=V,this._$AN=void 0,this._$AA=t,this._$AB=e,this._$AM=i,this.options=o,this._$Cv=o?.isConnected??!0}get parentNode(){let t=this._$AA.parentNode;const e=this._$AM;return void 0!==e&&11===t?.nodeType&&(t=e.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,e=this){t=J(this,t,e),I(t)?t===V||null==t||""===t?(this._$AH!==V&&this._$AR(),this._$AH=V):t!==this._$AH&&t!==H&&this._(t):void 0!==t._$litType$?this.$(t):void 0!==t.nodeType?this.T(t):(t=>M(t)||"function"==typeof t?.[Symbol.iterator])(t)?this.k(t):this._(t)}O(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t))}_(t){this._$AH!==V&&I(this._$AH)?this._$AA.nextSibling.data=t:this.T(C.createTextNode(t)),this._$AH=t}$(t){const{values:e,_$litType$:i}=t,o="number"==typeof i?this._$AC(t):(void 0===i.el&&(i.el=K.createElement(Y(i.h,i.h[0]),this.options)),i);if(this._$AH?._$AD===o)this._$AH.p(e);else{const t=new G(o,this),i=t.u(this.options);t.p(e),this.T(i),this._$AH=t}}_$AC(t){let e=Z.get(t.strings);return void 0===e&&Z.set(t.strings,e=new K(t)),e}k(t){M(this._$AH)||(this._$AH=[],this._$AR());const e=this._$AH;let i,o=0;for(const s of t)o===e.length?e.push(i=new X(this.O(O()),this.O(O()),this,this.options)):i=e[o],i._$AI(s),o++;o<e.length&&(this._$AR(i&&i._$AB.nextSibling,o),e.length=o)}_$AR(t=this._$AA.nextSibling,e){for(this._$AP?.(!1,!0,e);t!==this._$AB;){const e=k(t).nextSibling;k(t).remove(),t=e}}setConnected(t){void 0===this._$AM&&(this._$Cv=t,this._$AP?.(t))}}class tt{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,e,i,o,s){this.type=1,this._$AH=V,this._$AN=void 0,this.element=t,this.name=e,this._$AM=o,this.options=s,i.length>2||""!==i[0]||""!==i[1]?(this._$AH=Array(i.length-1).fill(new String),this.strings=i):this._$AH=V}_$AI(t,e=this,i,o){const s=this.strings;let r=!1;if(void 0===s)t=J(this,t,e,0),r=!I(t)||t!==this._$AH&&t!==H,r&&(this._$AH=t);else{const o=t;let n,a;for(t=s[0],n=0;n<s.length-1;n++)a=J(this,o[i+n],e,n),a===H&&(a=this._$AH[n]),r||=!I(a)||a!==this._$AH[n],a===V?t=V:t!==V&&(t+=(a??"")+s[n+1]),this._$AH[n]=a}r&&!o&&this.j(t)}j(t){t===V?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}}class et extends tt{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===V?void 0:t}}class it extends tt{constructor(){super(...arguments),this.type=4}j(t){this.element.toggleAttribute(this.name,!!t&&t!==V)}}class ot extends tt{constructor(t,e,i,o,s){super(t,e,i,o,s),this.type=5}_$AI(t,e=this){if((t=J(this,t,e,0)??V)===H)return;const i=this._$AH,o=t===V&&i!==V||t.capture!==i.capture||t.once!==i.once||t.passive!==i.passive,s=t!==V&&(i===V||o);o&&this.element.removeEventListener(this.name,this,i),s&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){"function"==typeof this._$AH?this._$AH.call(this.options?.host??this.element,t):this._$AH.handleEvent(t)}}class st{constructor(t,e,i){this.element=t,this.type=6,this._$AN=void 0,this._$AM=e,this.options=i}get _$AU(){return this._$AM._$AU}_$AI(t){J(this,t)}}const rt=x.litHtmlPolyfillSupport;rt?.(K,X),(x.litHtmlVersions??=[]).push("3.3.3");const nt=globalThis;class at extends w{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){const t=super.createRenderRoot();return this.renderOptions.renderBefore??=t.firstChild,t}update(t){const e=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=((t,e,i)=>{const o=i?.renderBefore??e;let s=o._$litPart$;if(void 0===s){const t=i?.renderBefore??null;o._$litPart$=s=new X(e.insertBefore(O(),t),t,void 0,i??{})}return s._$AI(t),s})(e,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return H}}at._$litElement$=!0,at.finalized=!0,nt.litElementHydrateSupport?.({LitElement:at});const lt=nt.litElementPolyfillSupport;lt?.({LitElement:at}),(nt.litElementVersions??=[]).push("4.2.2");const ct={attribute:!0,type:String,converter:b,reflect:!1,hasChanged:$},ht=(t=ct,e,i)=>{const{kind:o,metadata:s}=i;let r=globalThis.litPropertyMetadata.get(s);if(void 0===r&&globalThis.litPropertyMetadata.set(s,r=new Map),"setter"===o&&((t=Object.create(t)).wrapped=!0),r.set(i.name,t),"accessor"===o){const{name:o}=i;return{set(i){const s=e.get.call(this);e.set.call(this,i),this.requestUpdate(o,s,t,!0,i)},init(e){return void 0!==e&&this.C(o,void 0,t,e),e}}}if("setter"===o){const{name:o}=i;return function(i){const s=this[o];e.call(this,i),this.requestUpdate(o,s,t,!0,i)}}throw Error("Unsupported decorator location: "+o)};function dt(t){return(e,i)=>"object"==typeof i?ht(t,e,i):((t,e,i)=>{const o=e.hasOwnProperty(i);return e.constructor.createProperty(i,t),o?Object.getOwnPropertyDescriptor(e,i):void 0})(t,e,i)}function pt(t){return dt({...t,state:!0,attribute:!1})}const ut={items_one:"{count} item",items_few:"{count} items",items_many:"{count} items",empty_freezer:"The freezer is empty.",add_first_item:"+ ADD FIRST ITEM",add:"+ ADD",all:"All",uncategorized:"Other",no_weight:"no weight set",pieces_short:"pcs",pieces_field:"Pieces per package",months_old:"{months} mo.",manage:"Manage products",close:"Close",back:"Back",what_to_add:"What do you want to add?",other_product:"Other…",custom_product_name:"Product name",add_product_title:"Add: {name}",edit_item_title:"Edit item",product:"Product",weight:"Weight",original_weight:"Original weight",optional:"optional",month:"Month",year:"Year",note:"Note",quantity:"Number of packages",add_to_freezer:"ADD TO FREEZER",save:"SAVE",cancel:"CANCEL",confirm:"CONFIRM",added_confirmation:"Added to the freezer:",weight_zero_remove:"Weight is 0. Do you want to remove the item?",remove_item_btn:"REMOVE ITEM",err_name_required:"Enter a product name.",err_invalid_weight:"The weight must be a positive number.",err_invalid_month:"The month is not valid.",err_invalid_year:"The year is not valid.",err_invalid_amount:"The amount must be a positive number.",err_amount_too_big:"Cannot remove {amount} g. Only {weight} g left.",err_invalid_pieces:"The number of pieces must be a positive number.",err_pieces_too_big:"Cannot remove {pieces} pcs. Only {count} pcs left.",err_nothing_to_remove:"Enter a weight or a number of pieces.",err_generic:"The action failed.",err_add_failed:"The item could not be added.",err_item_gone:"The item no longer exists. The list was refreshed.",remove_question:"Remove {label}?",note_label:"Note:",remove_all:"REMOVE ALL",remove_half:"REMOVE HALF – {half} g",remove_half_pieces:"REMOVE HALF – {half} pcs",remove_amount:"ENTER AMOUNT",edit:"EDIT",how_much_remove:"How much do you want to remove?",currently_in_freezer:"Currently in the freezer:",remaining_after:"Remaining after removal:",item_removed:"The item was removed.",item_updated:"The item was updated.",undo:"UNDO",categories:"Categories",products:"Products",add_category:"Add category",add_product_btn:"Add product",name:"Name",icon:"Icon",color:"Color",category:"Category",no_category:"No category",default_weight:"Default weight",quick_weights:"Quick weight choices (g, comma separated)",quick_pieces:"Quick piece choices (comma separated)",ask_for_weight:"Show weight field",enabled:"Visible",max_months:"Recommended storage time (months)",delete:"Delete",restore_defaults:"Restore default products",restore_defaults_confirm:"Restore the default products and categories? Items in the freezer stay untouched.",delete_category_confirm:"Delete category {name}? Its products will keep working without a category.",delete_product_confirm:"Delete product {name}?",move_up:"Move up",move_down:"Move down",month_1:"January",month_2:"February",month_3:"March",month_4:"April",month_5:"May",month_6:"June",month_7:"July",month_8:"August",month_9:"September",month_10:"October",month_11:"November",month_12:"December"},_t={cs:{items_one:"{count} položka",items_few:"{count} položky",items_many:"{count} položek",empty_freezer:"Mrazák je prázdný.",add_first_item:"+ PŘIDAT PRVNÍ POLOŽKU",add:"+ PŘIDAT",all:"Vše",uncategorized:"Ostatní",no_weight:"hmotnost neuvedena",pieces_short:"ks",pieces_field:"Kusy v balíčku",months_old:"{months} měs.",manage:"Správa produktů",close:"Zavřít",back:"Zpět",what_to_add:"Co chcete přidat?",other_product:"Jiné…",custom_product_name:"Název produktu",add_product_title:"Přidat: {name}",edit_item_title:"Upravit položku",product:"Produkt",weight:"Hmotnost",original_weight:"Původní hmotnost",optional:"nepovinné",month:"Měsíc",year:"Rok",note:"Poznámka",quantity:"Počet balíčků",add_to_freezer:"PŘIDAT DO MRAZÁKU",save:"ULOŽIT",cancel:"ZRUŠIT",confirm:"POTVRDIT",added_confirmation:"Přidáno do mrazáku:",weight_zero_remove:"Hmotnost je 0. Chcete položku odstranit?",remove_item_btn:"ODSTRANIT POLOŽKU",err_name_required:"Zadejte název produktu.",err_invalid_weight:"Hmotnost musí být kladné číslo.",err_invalid_month:"Zadaný měsíc není platný.",err_invalid_year:"Zadaný rok není platný.",err_invalid_amount:"Množství musí být kladné číslo.",err_amount_too_big:"Nelze vyjmout {amount} g. V mrazáku zbývá pouze {weight} g.",err_invalid_pieces:"Počet kusů musí být kladné číslo.",err_pieces_too_big:"Nelze vyjmout {pieces} ks. Zbývá pouze {count} ks.",err_nothing_to_remove:"Zadejte hmotnost nebo počet kusů.",err_generic:"Akce se nepodařila.",err_add_failed:"Položku se nepodařilo přidat.",err_item_gone:"Položka už neexistuje. Seznam byl aktualizován.",remove_question:"Vyjmout {label}?",note_label:"Poznámka:",remove_all:"VYJMOUT CELÉ",remove_half:"VYJMOUT POLOVINU – {half} g",remove_half_pieces:"VYJMOUT POLOVINU – {half} ks",remove_amount:"ZADAT MNOŽSTVÍ",edit:"UPRAVIT",how_much_remove:"Kolik chcete vyjmout?",currently_in_freezer:"Aktuálně v mrazáku:",remaining_after:"Po vyjmutí zůstane:",item_removed:"Položka byla vyjmuta.",item_updated:"Položka byla upravena.",undo:"VRÁTIT ZPĚT",categories:"Kategorie",products:"Produkty",add_category:"Přidat kategorii",add_product_btn:"Přidat produkt",name:"Název",icon:"Ikona",color:"Barva",category:"Kategorie",no_category:"Bez kategorie",default_weight:"Výchozí hmotnost",quick_weights:"Rychlé volby hmotnosti (g, oddělené čárkou)",quick_pieces:"Rychlé volby kusů (oddělené čárkou)",ask_for_weight:"Zobrazovat pole hmotnosti",enabled:"Zobrazovat",max_months:"Doporučená doba skladování (měsíce)",delete:"Smazat",restore_defaults:"Obnovit výchozí produkty",restore_defaults_confirm:"Obnovit výchozí nabídku produktů a kategorií? Položky v mrazáku zůstanou beze změny.",delete_category_confirm:"Smazat kategorii {name}? Produkty v ní zůstanou bez kategorie.",delete_product_confirm:"Smazat produkt {name}?",move_up:"Posunout nahoru",move_down:"Posunout dolů",month_1:"Leden",month_2:"Únor",month_3:"Březen",month_4:"Duben",month_5:"Květen",month_6:"Červen",month_7:"Červenec",month_8:"Srpen",month_9:"Září",month_10:"Říjen",month_11:"Listopad",month_12:"Prosinec"},en:ut};function mt(t,e){let i="items_many";return 1===e?i="items_one":e>=2&&e<=4&&(i="items_few"),t(i,{count:e})}function gt(t){return`${String(t.month).padStart(2,"0")}/${t.year}`}function ft(t,e){const i=[t.product_name,gt(t)];return null!=t.weight&&i.push(`${t.weight} ${t.unit||"g"}`),null!=t.pieces&&i.push(`${t.pieces} ${e?e("pieces_short"):"ks"}`),i.join(" · ")}function vt(t,e=new Date){return 12*(e.getFullYear()-t.year)+(e.getMonth()+1-t.month)}function bt(t,e="mdi:food"){const i=t||e;return i.startsWith("mdi:")?F`<ha-icon icon=${i}></ha-icon>`:F`<span class="emoji-icon" aria-hidden="true">${i}</span>`}function $t(t){return t?`--fi-avatar-color:${t}`:""}function yt(t,e,i){t.dispatchEvent(new CustomEvent(e,{detail:i,bubbles:!0,composed:!0}))}let wt=!1;async function xt(){if(wt)return;if(wt=!0,customElements.get("ha-dialog")&&customElements.get("ha-form")&&customElements.get("ha-icon"))return;const t=window.loadCardHelpers;try{t&&await t();const e=customElements.get("hui-button-card");e?.getConfigElement?.();const i=customElements.get("hui-entities-card");i?.getConfigElement?.(),await Promise.race([customElements.whenDefined("ha-dialog"),new Promise(t=>setTimeout(t,2e3))])}catch{}}const kt=n`
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
`,zt="freezer_inventory";async function Et(t){return t.callWS({type:`${zt}/get_config`})}async function At(t){return(await t.callWS({type:`${zt}/get_products`})).products}async function Tt(t){return(await t.callWS({type:`${zt}/get_categories`})).categories}async function St(t,e,i,o){await t.callService(zt,"update_item",{freezer_id:e,item_id:i,...o})}function Pt(t,e){if(t&&"object"==typeof t&&"message"in t){const e=t.message;if("string"==typeof e&&e)return e}return e}const Ct="__none__";class Ot extends at{constructor(){super(...arguments),this.items=[],this.categories=[],this.oldMonths=6,this.showWeight=!0,this.showNote=!0,this.isAdmin=!1,this._filter=null}_ageClass(t){const e=t.category_id?this.categories.find(e=>e.id===t.category_id):void 0,i=e?.max_months??this.oldMonths,o=vt(t);return o>=i?"danger":o>=Math.ceil(i/2)?"warn":""}_categoryFor(t){return t.category_id?this.categories.find(e=>e.id===t.category_id):void 0}get _filterChips(){const t=new Set(this.items.map(t=>t.category_id??Ct)),e=this.categories.filter(e=>e.enabled&&t.has(e.id)).map(t=>({id:t.id,name:t.name}));return t.has(Ct)&&e.length&&e.push({id:Ct,name:this.localize("uncategorized")}),e}get _visibleItems(){return this._filter?this.items.filter(t=>(t.category_id??Ct)===this._filter):this.items}render(){if(!this.items.length)return F`
        <div class="empty">
          <div class="empty-icon"><ha-icon icon="mdi:snowflake"></ha-icon></div>
          <p>${this.localize("empty_freezer")}</p>
          <div class="footer empty-footer">
            <button
              class="btn btn-primary"
              @click=${()=>yt(this,"fi-add")}
            >
              ${this.localize("add_first_item")}
            </button>
            ${this.isAdmin?F`
                  <button
                    class="btn btn-quiet manage-btn"
                    title=${this.localize("manage")}
                    aria-label=${this.localize("manage")}
                    @click=${()=>yt(this,"fi-manage")}
                  >
                    <ha-icon icon="mdi:cog-outline"></ha-icon>
                  </button>
                `:V}
          </div>
        </div>
      `;const t=this._filterChips;return F`
      ${t.length>1?F`
            <div class="chips filter-row">
              <button
                class="chip ${null===this._filter?"active":""}"
                @click=${()=>this._filter=null}
              >
                ${this.localize("all")}
              </button>
              ${t.map(t=>F`
                  <button
                    class="chip ${this._filter===t.id?"active":""}"
                    @click=${()=>this._filter=this._filter===t.id?null:t.id}
                  >
                    ${t.name}
                  </button>
                `)}
            </div>
          `:V}
      <div class="list" role="list">
        ${this._visibleItems.map(t=>this._renderRow(t))}
      </div>
      <div class="footer">
        <button class="btn btn-primary" @click=${()=>yt(this,"fi-add")}>
          ${this.localize("add")}
        </button>
        ${this.isAdmin?F`
              <button
                class="btn btn-quiet manage-btn"
                title=${this.localize("manage")}
                aria-label=${this.localize("manage")}
                @click=${()=>yt(this,"fi-manage")}
              >
                <ha-icon icon="mdi:cog-outline"></ha-icon>
              </button>
            `:V}
      </div>
    `}_renderRow(t){const e=this._ageClass(t),i=vt(t),o=this._categoryFor(t),s=[];null!=t.weight&&s.push(`${t.weight} ${t.unit||"g"}`),null!=t.pieces&&s.push(`${t.pieces} ${this.localize("pieces_short")}`);const r=s.length?s.join(" · "):this.localize("no_weight");return F`
      <button
        class="item-row ${e}"
        role="listitem"
        @click=${()=>yt(this,"fi-select-item",{item:t})}
      >
        <span
          class="avatar ${e}"
          style=${e?"":$t(o?.color)}
        >
          ${bt(o?.icon,"mdi:snowflake")}
        </span>
        <span class="item-main">
          <span class="item-name">${t.product_name}</span>
          <span class="item-sub">
            ${gt(t)}${this.showWeight?F` · ${r}`:V}
            ${this.showNote&&t.note?F`<span class="item-note"> · ${t.note}</span>`:V}
          </span>
        </span>
        ${e?F`<span class="age-badge ${e}"
              >${this.localize("months_old",{months:i})}</span
            >`:V}
      </button>
    `}static{this.styles=[kt,n`
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
    `]}}t([dt({attribute:!1})],Ot.prototype,"items",void 0),t([dt({attribute:!1})],Ot.prototype,"categories",void 0),t([dt({attribute:!1})],Ot.prototype,"localize",void 0),t([dt({attribute:!1})],Ot.prototype,"oldMonths",void 0),t([dt({attribute:!1})],Ot.prototype,"showWeight",void 0),t([dt({attribute:!1})],Ot.prototype,"showNote",void 0),t([dt({attribute:!1})],Ot.prototype,"isAdmin",void 0),t([pt()],Ot.prototype,"_filter",void 0),customElements.define("fi-list-view",Ot);class It extends at{constructor(){super(...arguments),this.products=[],this.categories=[]}get _groups(){const t=this.products.filter(t=>t.enabled),e=[];for(const i of this.categories.filter(t=>t.enabled)){const o=t.filter(t=>t.category_id===i.id);o.length&&e.push({category:i,products:o})}const i=new Set(this.categories.map(t=>t.id)),o=t.filter(t=>!t.category_id||!i.has(t.category_id));return o.length&&e.push({category:null,products:o}),e}render(){return F`
      <h2 class="view-title">${this.localize("what_to_add")}</h2>
      ${this._groups.map(t=>F`
          <div class="group">
            ${t.category?F`<h3 class="group-title">${t.category.name}</h3>`:F`<h3 class="group-title">${this.localize("uncategorized")}</h3>`}
            <div class="tiles">
              ${t.products.map(e=>F`
                  <button
                    class="tile"
                    @click=${()=>yt(this,"fi-pick-product",{product:e})}
                  >
                    <span class="avatar" style=${$t(t.category?.color)}>
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
            @click=${()=>yt(this,"fi-pick-other")}
          >
            <span class="avatar"><ha-icon icon="mdi:pencil-plus"></ha-icon></span>
            <span class="tile-name">${this.localize("other_product")}</span>
          </button>
        </div>
      </div>
      ${V}
    `}static{this.styles=[kt,n`
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
    `]}}t([dt({attribute:!1})],It.prototype,"products",void 0),t([dt({attribute:!1})],It.prototype,"categories",void 0),t([dt({attribute:!1})],It.prototype,"localize",void 0),customElements.define("fi-product-picker",It);class Mt extends at{constructor(){super(...arguments),this.product=null,this.item=null,this.submitting=!1,this.errorText="",this._name="",this._weight="",this._originalWeight="",this._pieces="",this._month=(new Date).getMonth()+1,this._year=(new Date).getFullYear(),this._note="",this._quantity=1,this._validationError="",this._confirmZeroWeight=!1}get _isEdit(){return null!==this.item}willUpdate(t){(t.has("item")||t.has("product"))&&this._initFromProps()}_initFromProps(){this._validationError="",this._confirmZeroWeight=!1,this._quantity=1,this.item?(this._name=this.item.product_name,this._weight=null!=this.item.weight?String(this.item.weight):"",this._originalWeight=null!=this.item.original_weight?String(this.item.original_weight):"",this._pieces=null!=this.item.pieces?String(this.item.pieces):"",this._month=this.item.month,this._year=this.item.year,this._note=this.item.note??""):(this._name=this.product?.name??"",this._weight="",this._originalWeight="",this._pieces="",this._month=(new Date).getMonth()+1,this._year=(new Date).getFullYear(),this._note="")}get _showWeightField(){return!!this._isEdit||(!this.product||this.product.ask_for_weight)}_parseWeight(t){const e=t.trim();if(!e)return null;const i=Number(e);return!(!Number.isFinite(i)||i<0||!Number.isInteger(i))&&i}_submit(){const t=this.localize;this._validationError="";const e=this._name.trim();if(!e)return void(this._validationError=t("err_name_required"));const i=this._parseWeight(this._weight);if(!1===i)return void(this._validationError=t("err_invalid_weight"));let o=null;if(this._isEdit&&(o=this._parseWeight(this._originalWeight),!1===o||0===o))return void(this._validationError=t("err_invalid_weight"));const s=this._parseWeight(this._pieces);if(!1===s||0===s)return void(this._validationError=t("err_invalid_pieces"));if(this._month<1||this._month>12)return void(this._validationError=t("err_invalid_month"));const r=(new Date).getFullYear();if(this._year<r-20||this._year>r+5)return void(this._validationError=t("err_invalid_year"));if(!this._isEdit&&0===i)return void(this._validationError=t("err_invalid_weight"));if(this._isEdit&&0===i)return void(this._confirmZeroWeight=!0);const n={product_id:this.product?.id??this.item?.product_id??void 0,product_name:e,month:this._month,year:this._year,weight:i,pieces:s,note:this._note.trim(),quantity:this._quantity};this._isEdit&&(n.original_weight=o),yt(this,"fi-form-submit",{result:n})}render(){const t=this.localize;let e=[],i=[];if(!this._isEdit){const t=new Set(this.product?.quick_weights??[]);null!=this.product?.default_weight&&t.add(this.product.default_weight),e=[...t].sort((t,e)=>t-e),i=this.product?.quick_pieces?.length?this.product.quick_pieces:[1,2,3,4,6]}const o=(new Date).getFullYear(),s=[];for(let t=o+1;t>=o-20;t--)s.push(t);return this._confirmZeroWeight?F`
        <h2 class="view-title">${t("edit_item_title")}</h2>
        <p class="confirm-text">${t("weight_zero_remove")}</p>
        <div class="row-of-buttons">
          <button
            class="btn btn-danger"
            @click=${()=>yt(this,"fi-form-remove")}
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
      `:F`
      <h2 class="view-title">
        ${this._isEdit?t("edit_item_title"):t("add_product_title",{name:this._name||"…"})}
      </h2>

      ${this.errorText?F`<div class="error-banner">${this.errorText}</div>`:V}
      ${this._validationError?F`<div class="error-banner">${this._validationError}</div>`:V}

      <div class="form-body">
      ${this._isEdit||!this.product?F`
            <div class="field">
              <label for="name">${t(this._isEdit?"product":"custom_product_name")}</label>
              <input
                id="name"
                type="text"
                .value=${this._name}
                @input=${t=>this._name=t.target.value}
              />
            </div>
          `:V}

      ${this._showWeightField?F`
            <div class="field">
              <label for="weight">
                ${t("weight")} <span class="opt">(${t("optional")})</span>
              </label>
              ${e.length?F`
                    <div class="chips weight-chips">
                      ${e.map(t=>F`
                          <button
                            class="chip ${this._weight===String(t)?"active":""}"
                            @click=${()=>this._weight=this._weight===String(t)?"":String(t)}
                          >
                            ${t} g
                          </button>
                        `)}
                    </div>
                  `:V}
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
          `:V}

      <div class="field">
        <label for="pieces">
          ${t("pieces_field")} <span class="opt">(${t("optional")})</span>
        </label>
        ${i.length?F`
              <div class="chips weight-chips">
                ${i.map(e=>F`
                    <button
                      class="chip ${this._pieces===String(e)?"active":""}"
                      @click=${()=>this._pieces=this._pieces===String(e)?"":String(e)}
                    >
                      ${e} ${t("pieces_short")}
                    </button>
                  `)}
              </div>
            `:V}
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

      ${this._isEdit?F`
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
          `:V}

      <div class="two-cols">
        <div class="field">
          <label for="month">${t("month")}</label>
          <select
            id="month"
            .value=${String(this._month)}
            @change=${t=>this._month=Number(t.target.value)}
          >
            ${Array.from({length:12},(t,e)=>e+1).map(e=>F`
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
            ${s.map(t=>F`
                <option value=${t} ?selected=${t===this._year}>${t}</option>
              `)}
          </select>
        </div>
      </div>

      ${this._isEdit?V:F`
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
          @click=${()=>yt(this,"fi-form-cancel")}
        >
          ${t("cancel")}
        </button>
      </div>
    `}static{this.styles=[kt,n`
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
    `]}}t([dt({attribute:!1})],Mt.prototype,"localize",void 0),t([dt({attribute:!1})],Mt.prototype,"product",void 0),t([dt({attribute:!1})],Mt.prototype,"item",void 0),t([dt({attribute:!1})],Mt.prototype,"submitting",void 0),t([dt({attribute:!1})],Mt.prototype,"errorText",void 0),t([pt()],Mt.prototype,"_name",void 0),t([pt()],Mt.prototype,"_weight",void 0),t([pt()],Mt.prototype,"_originalWeight",void 0),t([pt()],Mt.prototype,"_pieces",void 0),t([pt()],Mt.prototype,"_month",void 0),t([pt()],Mt.prototype,"_year",void 0),t([pt()],Mt.prototype,"_note",void 0),t([pt()],Mt.prototype,"_quantity",void 0),t([pt()],Mt.prototype,"_validationError",void 0),t([pt()],Mt.prototype,"_confirmZeroWeight",void 0),customElements.define("fi-item-form",Mt);class Nt extends at{constructor(){super(...arguments),this.submitting=!1,this.errorText="",this.mode="confirm",this._amount="",this._pieces="",this._validationError=""}willUpdate(t){(t.has("item")||t.has("mode"))&&(this._amount="",this._pieces="",this._validationError="")}get _halfLabel(){const t=this.localize;return null!=this.item.weight?t("remove_half",{half:Math.floor(this.item.weight/2+.5)}):t("remove_half_pieces",{half:Math.floor((this.item.pieces??0)/2+.5)})}_parseField(t){const e=t.trim();if(!e)return null;const i=Number(e);return!(!Number.isFinite(i)||!Number.isInteger(i)||i<=0)&&i}_submitAmount(){const t=this.localize;this._validationError="";const e=null!=this.item.weight?this._parseField(this._amount):null,i=null!=this.item.pieces?this._parseField(this._pieces):null;!1!==e?!1!==i?null!==e||null!==i?null!==e&&e>(this.item.weight??0)?this._validationError=t("err_amount_too_big",{amount:e,weight:this.item.weight??0}):null!==i&&i>(this.item.pieces??0)?this._validationError=t("err_pieces_too_big",{pieces:i,count:this.item.pieces??0}):yt(this,"fi-remove-amount",{amount:e,pieces:i}):this._validationError=t("err_nothing_to_remove"):this._validationError=t("err_invalid_pieces"):this._validationError=t("err_invalid_amount")}render(){return"amount"===this.mode?this._renderAmount():this._renderConfirm()}_renderConfirm(){const t=this.localize,e=null!=this.item.weight,i=null!=this.item.pieces,o=e||i&&(this.item.pieces??0)>1;return F`
      <h2 class="view-title question">
        ${t("remove_question",{label:ft(this.item,t)})}
      </h2>
      ${this.item.note?F`
            <p class="note">
              <span class="note-label">${t("note_label")}</span> ${this.item.note}
            </p>
          `:V}
      ${this.errorText?F`<div class="error-banner">${this.errorText}</div>`:V}
      <div class="row-of-buttons">
        <button
          class="btn btn-primary"
          ?disabled=${this.submitting}
          @click=${()=>yt(this,"fi-remove-all")}
        >
          ${t("remove_all")}
        </button>
        ${o?F`
              <button
                class="btn btn-outline"
                ?disabled=${this.submitting}
                @click=${()=>yt(this,"fi-remove-half")}
              >
                ${this._halfLabel}
              </button>
            `:V}
        ${e||i?F`
              <button
                class="btn btn-outline"
                @click=${()=>yt(this,"fi-enter-amount")}
              >
                ${t("remove_amount")}
              </button>
            `:V}
        <button
          class="btn btn-outline"
          @click=${()=>yt(this,"fi-edit-item")}
        >
          ${t("edit")}
        </button>
        <button
          class="btn btn-quiet"
          @click=${()=>yt(this,"fi-remove-cancel")}
        >
          ${t("cancel")}
        </button>
      </div>
    `}_renderAmount(){const t=this.localize,e=null!=this.item.weight,i=null!=this.item.pieces,o=this.item.weight??0,s=this.item.pieces??0,r=this.item.unit||"g",n=t("pieces_short"),a=this._parseField(this._amount),l=this._parseField(this._pieces),c=e&&a&&a<=o?o-a:null,h=i&&l&&l<=s?s-l:null,d=[];e&&d.push(`${o} ${r}`),i&&d.push(`${s} ${n}`);const p=[];return null!==c?p.push(`${c} ${r}`):e&&l&&p.push(`${o} ${r}`),null!==h?p.push(`${h} ${n}`):i&&a&&p.push(`${s} ${n}`),F`
      <h2 class="view-title">${t("how_much_remove")}</h2>
      <p class="current">
        ${t("currently_in_freezer")}
        <strong>${d.join(" · ")}</strong>
      </p>
      ${this.errorText?F`<div class="error-banner">${this.errorText}</div>`:V}
      ${this._validationError?F`<div class="error-banner">${this._validationError}</div>`:V}
      <div class="form-body">
      ${e?F`
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
                <span class="unit">${r}</span>
              </div>
            </div>
          `:V}
      ${i?F`
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
                <span class="unit">${n}</span>
              </div>
            </div>
          `:V}
      </div>
      ${p.length&&(a||l)?F`
            <p class="remaining">
              ${t("remaining_after")}
              <strong>${p.join(" · ")}</strong>
            </p>
          `:V}
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
          @click=${()=>yt(this,"fi-remove-cancel")}
        >
          ${t("cancel")}
        </button>
      </div>
    `}static{this.styles=[kt,n`
      .question {
        line-height: 1.35;
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
    `]}}t([dt({attribute:!1})],Nt.prototype,"localize",void 0),t([dt({attribute:!1})],Nt.prototype,"item",void 0),t([dt({attribute:!1})],Nt.prototype,"submitting",void 0),t([dt({attribute:!1})],Nt.prototype,"errorText",void 0),t([dt({attribute:!1})],Nt.prototype,"mode",void 0),t([pt()],Nt.prototype,"_amount",void 0),t([pt()],Nt.prototype,"_pieces",void 0),t([pt()],Nt.prototype,"_validationError",void 0),customElements.define("fi-remove-dialog",Nt);const Rt=["#f59e0b","#f06292","#c62828","#8e24aa","#0288d1","#2e7d32","#00897b","#607d8b"];class Dt extends at{constructor(){super(...arguments),this.categories=[],this.products=[],this._tab="products",this._editing=null,this._confirm=null,this._error="",this._busy=!1,this._fName="",this._fIcon="",this._fCategoryId="",this._fDefaultWeight="",this._fQuickWeights="",this._fQuickPieces="",this._fAskForWeight=!0,this._fEnabled=!0,this._fMaxMonths="",this._fColor=null}async _run(t){this._busy=!0,this._error="";try{await t(),this._editing=null,this._confirm=null}catch(t){this._error=Pt(t,this.localize("err_generic"))}finally{this._busy=!1}}_startEditCategory(t){this._editing={kind:"category",category:t},this._error="",this._fName=t?.name??"",this._fIcon=t?.icon??"",this._fEnabled=t?.enabled??!0,this._fMaxMonths=null!=t?.max_months?String(t.max_months):"",this._fColor=t?.color??null}_startEditProduct(t){this._editing={kind:"product",product:t},this._error="",this._fName=t?.name??"",this._fIcon=t?.icon??"",this._fCategoryId=t?.category_id??"",this._fDefaultWeight=null!=t?.default_weight?String(t.default_weight):"",this._fQuickWeights=(t?.quick_weights??[]).join(", "),this._fQuickPieces=(t?.quick_pieces??[]).join(", "),this._fAskForWeight=t?.ask_for_weight??!0,this._fEnabled=t?.enabled??!0}_parseOptionalInt(t){const e=t.trim();if(!e)return null;const i=Number(e);return Number.isInteger(i)&&i>0?i:null}async _saveCategory(){const t=this._editing;if(!t||"category"!==t.kind)return;const e={name:this._fName.trim(),icon:this._fIcon.trim()||"mdi:food",color:this._fColor,max_months:this._parseOptionalInt(this._fMaxMonths)};await this._run(async()=>{t.category?await async function(t,e,i){return(await t.callWS({type:`${zt}/category/update`,category_id:e,...i})).category}(this.hass,t.category.id,{...e,enabled:this._fEnabled}):await async function(t,e){return(await t.callWS({type:`${zt}/category/create`,...e})).category}(this.hass,e)})}async _saveProduct(){const t=this._editing;if(!t||"product"!==t.kind)return;const e=t=>t.split(",").map(t=>Number(t.trim())).filter(t=>Number.isInteger(t)&&t>0),i={name:this._fName.trim(),icon:this._fIcon.trim()||"mdi:food",category_id:this._fCategoryId||null,default_weight:this._parseOptionalInt(this._fDefaultWeight),quick_weights:e(this._fQuickWeights),quick_pieces:e(this._fQuickPieces),ask_for_weight:this._fAskForWeight};await this._run(async()=>{t.product?await async function(t,e,i){return(await t.callWS({type:`${zt}/product/update`,product_id:e,...i})).product}(this.hass,t.product.id,{...i,enabled:this._fEnabled}):await async function(t,e){return(await t.callWS({type:`${zt}/product/create`,...e})).product}(this.hass,i)})}async _move(t,e,i){if("category"===t){const t=this.categories.map(t=>t.id),o=t.indexOf(e),s=o+i;if(o<0||s<0||s>=t.length)return;[t[o],t[s]]=[t[s],t[o]],await this._run(()=>async function(t,e){await t.callWS({type:`${zt}/categories/reorder`,category_ids:e})}(this.hass,t))}else{const t=this.products.map(t=>t.id),o=t.indexOf(e),s=o+i;if(o<0||s<0||s>=t.length)return;[t[o],t[s]]=[t[s],t[o]],await this._run(()=>async function(t,e){await t.callWS({type:`${zt}/products/reorder`,product_ids:e})}(this.hass,t))}}render(){const t=this.localize;return this._confirm?F`
        <p class="confirm-text">${this._confirm.text}</p>
        ${this._error?F`<div class="error-banner">${this._error}</div>`:V}
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
      `:"category"===this._editing?.kind?this._renderCategoryForm():"product"===this._editing?.kind?this._renderProductForm():this._renderOverview()}_renderOverview(){const t=this.localize;return F`
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
      ${this._error?F`<div class="error-banner">${this._error}</div>`:V}
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
          @click=${()=>this._confirm={text:t("restore_defaults_confirm"),action:()=>async function(t){await t.callWS({type:`${zt}/restore_defaults`})}(this.hass)}}
        >
          ${t("restore_defaults")}
        </button>
        <button class="btn btn-quiet" @click=${()=>yt(this,"fi-manage-close")}>
          ${t("back")}
        </button>
      </div>
    `}_renderCategoryList(){const t=this.localize;return F`
      <div class="rows">
        ${this.categories.map((e,i)=>F`
            <div class="row ${e.enabled?"":"disabled"}">
              <span class="avatar small" style=${$t(e.color)}>
                ${bt(e.icon)}
              </span>
              <button class="row-main" @click=${()=>this._startEditCategory(e)}>
                <span class="row-name">${e.name}</span>
                ${null!=e.max_months?F`<span class="row-sub"
                      >${t("max_months")}: ${e.max_months}</span
                    >`:V}
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
    `}_renderProductList(){const t=this.localize;return F`
      <div class="rows">
        ${this.products.map((e,i)=>{const o=this.categories.find(t=>t.id===e.category_id);return F`
            <div class="row ${e.enabled?"":"disabled"}">
              <span class="avatar small" style=${$t(o?.color)}>
                ${bt(e.icon)}
              </span>
              <button class="row-main" @click=${()=>this._startEditProduct(e)}>
                <span class="row-name">${e.name}</span>
                <span class="row-sub">
                  ${o?.name??t("no_category")}
                  ${null!=e.default_weight?F` · ${e.default_weight} g`:V}
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
    `}_renderCategoryForm(){const t=this.localize,e=this._editing;return F`
      <h2 class="view-title">
        ${e.category?e.category.name:t("add_category")}
      </h2>
      ${this._error?F`<div class="error-banner">${this._error}</div>`:V}
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
          ${Rt.map(t=>F`
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
      ${e.category?this._renderEnabledToggle():V}
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
    `}_renderProductForm(){const t=this.localize,e=this._editing;return F`
      <h2 class="view-title">
        ${e.product?e.product.name:t("add_product_btn")}
      </h2>
      ${this._error?F`<div class="error-banner">${this._error}</div>`:V}
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
          ${this.categories.map(t=>F`
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
      ${e.product?this._renderEnabledToggle():V}
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
    `}_renderEnabledToggle(){return F`
      <label class="toggle-row">
        <input
          type="checkbox"
          .checked=${this._fEnabled}
          @change=${t=>this._fEnabled=t.target.checked}
        />
        ${this.localize("enabled")}
      </label>
    `}static{this.styles=[kt,n`
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
    `]}}t([dt({attribute:!1})],Dt.prototype,"hass",void 0),t([dt({attribute:!1})],Dt.prototype,"localize",void 0),t([dt({attribute:!1})],Dt.prototype,"categories",void 0),t([dt({attribute:!1})],Dt.prototype,"products",void 0),t([pt()],Dt.prototype,"_tab",void 0),t([pt()],Dt.prototype,"_editing",void 0),t([pt()],Dt.prototype,"_confirm",void 0),t([pt()],Dt.prototype,"_error",void 0),t([pt()],Dt.prototype,"_busy",void 0),t([pt()],Dt.prototype,"_fName",void 0),t([pt()],Dt.prototype,"_fIcon",void 0),t([pt()],Dt.prototype,"_fCategoryId",void 0),t([pt()],Dt.prototype,"_fDefaultWeight",void 0),t([pt()],Dt.prototype,"_fQuickWeights",void 0),t([pt()],Dt.prototype,"_fQuickPieces",void 0),t([pt()],Dt.prototype,"_fAskForWeight",void 0),t([pt()],Dt.prototype,"_fEnabled",void 0),t([pt()],Dt.prototype,"_fMaxMonths",void 0),t([pt()],Dt.prototype,"_fColor",void 0),customElements.define("fi-manage-view",Dt);const Wt="main_freezer";console.info("%c FREEZER-INVENTORY-CARD %c 1.0.0 ","color: white; background: #03a9f4; font-weight: 700;","color: #03a9f4; background: white; font-weight: 700;");class Ut extends at{constructor(){super(...arguments),this._config={type:""},this._items=[],this._products=[],this._categories=[],this._integration=null,this._dialogOpen=!1,this._view="list",this._selectedItem=null,this._pickedProduct=null,this._customProduct=!1,this._errorText="",this._busy=!1,this._toast=null,this._loaded=!1,this._connectionError="",this._initStarted=!1,this._focusPending=!1,this._onDialogKeydown=t=>{this._resetAutoClose(),"Escape"===t.key&&(t.stopPropagation(),this._closeDialog())}}static getConfigElement(){return Promise.resolve().then(function(){return Lt}),document.createElement("freezer-inventory-card-editor")}static getStubConfig(){return{freezer_id:Wt,display_mode:"popup",touch_mode:!0}}setConfig(t){this._config={...t}}getCardSize(){return"list"===this._config.display_mode?6:2}getGridOptions(){return"list"===this._config.display_mode?{rows:8,columns:12,min_rows:4}:{rows:2,columns:6,min_rows:1}}connectedCallback(){super.connectedCallback(),xt(),this._maybeInit()}disconnectedCallback(){super.disconnectedCallback(),this._unsub?.then(t=>t()).catch(()=>{}),this._unsub=void 0,this._initStarted=!1,this._toastTimer&&clearTimeout(this._toastTimer),this._autoCloseTimer&&clearTimeout(this._autoCloseTimer),this._lockPageOverscroll(!1)}_resetAutoClose(){this._autoCloseTimer&&clearTimeout(this._autoCloseTimer);const t=Number(this._config.auto_close)||0;t>0&&this._dialogOpen&&(this._autoCloseTimer=setTimeout(()=>{this._dialogOpen&&this._closeDialog()},1e3*t))}updated(){this._maybeInit(),this._focusPending&&this._dialogOpen&&(this._focusPending=!1,this.renderRoot.querySelector(".overlay-card")?.focus())}get _freezerId(){return this._config.freezer_id||Wt}get _localize(){return function(t){const e=_t[t]??ut;return(t,i)=>{let o=e[t]??ut[t]??t;if(i)for(const[t,e]of Object.entries(i))o=o.replaceAll(`{${t}}`,String(e));return o}}(this._config.language||this._integration?.language||("cs"===this.hass?.locale?.language?"cs":"en"))}get _touchMode(){return!1!==this._config.touch_mode}get _oldMonths(){return this._config.old_months??this._integration?.old_months??6}async _maybeInit(){if(!this._initStarted&&this.hass&&this.isConnected){this._initStarted=!0;try{const[i,o,s]=await Promise.all([Et(this.hass),At(this.hass),Tt(this.hass)]);this._integration=i,this._products=o,this._categories=s,this._unsub=(t=this.hass,e=t=>this._handleUpdate(t),t.connection.subscribeMessage(e,{type:`${zt}/subscribe_updates`})),await this._unsub,this._loaded=!0,this._connectionError=""}catch(t){this._connectionError=Pt(t,"Freezer Inventory not available"),this._initStarted=!1}var t,e}}async _handleUpdate(t){if("items"===t.type){if(t.freezer_id!==this._freezerId)return;if(this._items=t.items,this._loaded=!0,this._selectedItem){const e=t.items.find(t=>t.id===this._selectedItem.id);e?this._selectedItem=e:"remove"!==this._view&&"amount"!==this._view||(this._selectedItem=null,this._view="list")}}else if("catalog"===t.type&&this.hass){const[t,e]=await Promise.all([At(this.hass),Tt(this.hass)]);this._products=t,this._categories=e}}get _sortedItems(){return"newest_first"===this._config.sort?[...this._items].reverse():this._items}_showToast(t,e=null){this._toastTimer&&clearTimeout(this._toastTimer),this._toast={text:t,undo:e},this._toastTimer=setTimeout(()=>this._toast=null,6e3)}async _undo(){const t=this._toast?.undo;if(this._toast=null,t&&this.hass)try{if("remove"===t.kind)await async function(t,e,i){await t.callWS({type:`${zt}/restore_item`,freezer_id:e,item:i})}(this.hass,this._freezerId,t.item);else{const e={};null!=t.previousWeight&&(e.weight=t.previousWeight),null!=t.previousPieces&&(e.pieces=t.previousPieces),Object.keys(e).length&&await St(this.hass,this._freezerId,t.item.id,e)}}catch(t){this._showToast(Pt(t,this._localize("err_generic")))}}_lockPageOverscroll(t){const e=document.documentElement.style,i=document.body.style;t&&!this._prevOverscroll?(this._prevOverscroll={html:e.overscrollBehaviorY,body:i.overscrollBehaviorY},e.overscrollBehaviorY="none",i.overscrollBehaviorY="none"):!t&&this._prevOverscroll&&(e.overscrollBehaviorY=this._prevOverscroll.html,i.overscrollBehaviorY=this._prevOverscroll.body,this._prevOverscroll=void 0)}_openDialog(t="list"){this._view=t,this._errorText="",this._dialogOpen=!0,this._focusPending=!0,this._lockPageOverscroll(!0),this._resetAutoClose()}_closeDialog(){this._dialogOpen=!1,this._view="list",this._selectedItem=null,this._pickedProduct=null,this._customProduct=!1,this._errorText="",this._lockPageOverscroll(!1),this._autoCloseTimer&&clearTimeout(this._autoCloseTimer)}_backToList(){this._view="list",this._selectedItem=null,this._pickedProduct=null,this._customProduct=!1,this._errorText="","list"===this._config.display_mode&&(this._dialogOpen=!1)}async _mutate(t,e){if(this.hass){this._busy=!0,this._errorText="";try{return await t(),!0}catch(t){return this._errorText=Pt(t,e),!1}finally{this._busy=!1}}}async _onFormSubmit(t){const e=t.detail.result,i=this._localize;if("edit"===this._view&&this._selectedItem){const t=this._selectedItem;await this._mutate(()=>St(this.hass,this._freezerId,t.id,{product_name:e.product_name,month:e.month,year:e.year,weight:e.weight,original_weight:e.original_weight??null,pieces:e.pieces,note:e.note}),i("err_generic"))&&(this._backToList(),this._showToast(i("item_updated")))}else{if(await this._mutate(()=>async function(t,e){await t.callService(zt,"add_item",e)}(this.hass,{freezer_id:this._freezerId,product_id:this._customProduct?void 0:this._pickedProduct?.id,product_name:e.product_name,month:e.month,year:e.year,weight:e.weight??void 0,pieces:e.pieces??void 0,note:e.note||void 0,quantity:e.quantity}),i("err_add_failed"))){const t=[e.product_name,`${String(e.month).padStart(2,"0")}/${e.year}`,null!=e.weight?`${e.weight} g`:null,null!=e.pieces?`${e.pieces} ${i("pieces_short")}`:null].filter(Boolean).join(" · "),o=e.quantity>1?`${e.quantity}× `:"";this._backToList(),this._showToast(`${i("added_confirmation")} ${o}${t}`)}}}async _onRemoveAll(){const t=this._selectedItem;if(!t)return;const e=this._localize;await this._mutate(()=>async function(t,e,i){await t.callService(zt,"remove_item",{freezer_id:e,item_id:i})}(this.hass,this._freezerId,t.id),e("err_generic"))&&(this._backToList(),this._showToast(e("item_removed"),{kind:"remove",item:t,label:ft(t,e)}))}async _onRemoveHalf(){const t=this._selectedItem;if(!t)return;const e=this._localize,i=t.weight??void 0,o=t.pieces??void 0;await this._mutate(()=>async function(t,e,i){await t.callService(zt,"remove_half",{freezer_id:e,item_id:i})}(this.hass,this._freezerId,t.id),e("err_generic"))&&(this._backToList(),this._showToast(e("item_updated"),{kind:"weight",item:t,previousWeight:i,previousPieces:o,label:ft(t,e)}))}async _onRemoveAmount(t){const e=this._selectedItem;if(!e)return;const i=this._localize,{amount:o,pieces:s}=t.detail,r=e.weight??void 0,n=e.pieces??void 0,a=null!=o&&o===e.weight||null!=s&&s===e.pieces;await this._mutate(()=>async function(t,e,i,o){await t.callService(zt,"remove_amount",{freezer_id:e,item_id:i,...o})}(this.hass,this._freezerId,e.id,{amount:o??void 0,pieces:s??void 0}),i("err_generic"))&&(this._backToList(),this._showToast(i(a?"item_removed":"item_updated"),a?{kind:"remove",item:e,label:ft(e,i)}:{kind:"weight",item:e,previousWeight:r,previousPieces:n,label:ft(e,i)}))}async _onFormRemove(){await this._onRemoveAll()}render(){if(this._connectionError&&!this._loaded)return F`<ha-card>
        <div class="error-banner card-error">${this._connectionError}</div>
      </ha-card>`;const t="list"===this._config.display_mode;return F`
      ${t?this._renderInlineList():this._renderTile()}
      ${this._renderDialog()} ${this._renderToast()}
    `}_renderTile(){const t=this._localize,e=this._config.name||this._friendlyName(),i=this._items.length;return F`
      <ha-card>
        <button class="tile" @click=${()=>this._openDialog("list")}>
          <span class="avatar tile-avatar">
            ${bt(this._config.icon,"mdi:snowflake")}
          </span>
          <span class="tile-text">
            <span class="tile-name">${e}</span>
            ${!1!==this._config.show_count?F`<span class="tile-count"
                  >${mt(t,i)}</span
                >`:V}
          </span>
        </button>
      </ha-card>
    `}_renderInlineList(){const t=this._localize,e=this._config.name||this._friendlyName();return F`
      <ha-card>
        <div class="inline-header">
          <span class="avatar tile-avatar">
            ${bt(this._config.icon,"mdi:snowflake")}
          </span>
          <span class="tile-text">
            <span class="tile-name">${e}</span>
            ${!1!==this._config.show_count?F`<span class="tile-count"
                  >${mt(t,this._items.length)}</span
                >`:V}
          </span>
        </div>
        <div class="inline-body">${this._renderListView()}</div>
      </ha-card>
    `}_friendlyName(){return"en"===this._integration?.language?"Freezer":"Mrazák"}_renderListView(){return F`
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
        @fi-select-item=${t=>{this._selectedItem=t.detail.item,this._openDialog("remove")}}
      ></fi-list-view>
    `}_renderCurrentView(){const t=this._localize;switch(this._view){case"picker":return F`
          <fi-product-picker
            ?touch=${this._touchMode}
            .products=${this._products}
            .categories=${this._categories}
            .localize=${t}
            @fi-pick-product=${t=>{this._pickedProduct=t.detail.product,this._customProduct=!1,this._view="form",this._errorText=""}}
            @fi-pick-other=${()=>{this._pickedProduct=null,this._customProduct=!0,this._view="form",this._errorText=""}}
          ></fi-product-picker>
        `;case"form":case"edit":return F`
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
        `;case"remove":case"amount":return this._selectedItem?F`
          <fi-remove-dialog
            ?touch=${this._touchMode}
            .localize=${t}
            .item=${this._selectedItem}
            .mode=${"amount"===this._view?"amount":"confirm"}
            .submitting=${this._busy}
            .errorText=${this._errorText}
            @fi-remove-all=${this._onRemoveAll}
            @fi-remove-half=${this._onRemoveHalf}
            @fi-enter-amount=${()=>{this._view="amount",this._errorText=""}}
            @fi-remove-amount=${this._onRemoveAmount}
            @fi-edit-item=${()=>{this._view="edit",this._errorText=""}}
            @fi-remove-cancel=${()=>"amount"===this._view?(this._view="remove",this._errorText=""):this._backToList()}
          ></fi-remove-dialog>
        `:this._renderListView();case"manage":return F`
          <fi-manage-view
            ?touch=${this._touchMode}
            .hass=${this.hass}
            .localize=${t}
            .categories=${this._categories}
            .products=${this._products}
            @fi-manage-close=${()=>this._backToList()}
          ></fi-manage-view>
        `;default:return this._renderListView()}}_renderDialog(){if(!this._dialogOpen)return V;const t=this._localize,e=this._config.name||this._friendlyName();return F`
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
    `}_renderToast(){return this._toast?F`
      <div class="toast" role="status">
        <span class="toast-text">${this._toast.text}</span>
        ${this._toast.undo?F`
              <button class="toast-undo" @click=${()=>this._undo()}>
                ${this._localize("undo")}
              </button>
            `:V}
      </div>
    `:V}static{this.styles=[kt,n`
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
    `]}}t([dt({attribute:!1})],Ut.prototype,"hass",void 0),t([pt()],Ut.prototype,"_config",void 0),t([pt()],Ut.prototype,"_items",void 0),t([pt()],Ut.prototype,"_products",void 0),t([pt()],Ut.prototype,"_categories",void 0),t([pt()],Ut.prototype,"_integration",void 0),t([pt()],Ut.prototype,"_dialogOpen",void 0),t([pt()],Ut.prototype,"_view",void 0),t([pt()],Ut.prototype,"_selectedItem",void 0),t([pt()],Ut.prototype,"_pickedProduct",void 0),t([pt()],Ut.prototype,"_customProduct",void 0),t([pt()],Ut.prototype,"_errorText",void 0),t([pt()],Ut.prototype,"_busy",void 0),t([pt()],Ut.prototype,"_toast",void 0),t([pt()],Ut.prototype,"_loaded",void 0),t([pt()],Ut.prototype,"_connectionError",void 0),customElements.define("freezer-inventory-card",Ut),window.customCards=window.customCards||[],window.customCards.push({type:"freezer-inventory-card",name:"Freezer Inventory Card",description:"Touch-friendly freezer inventory card for the Freezer Inventory integration.",preview:!1,documentationURL:"https://github.com/nikopol666/homeassistant-freezer-inventory"});const jt={cs:{freezer_id:"Mrazák",name:"Název (nepovinné)",icon:"Ikona",display_mode:"Režim zobrazení",popup:"Dlaždice s popupem",list:"Přímý seznam",touch_mode:"Tabletový režim (větší prvky)",show_count:"Zobrazit počet položek",show_weight:"Zobrazovat hmotnost",show_note:"Zobrazovat poznámku",sort:"Řazení",oldest_first:"Od nejstarších",newest_first:"Od nejnovějších",old_months:"Zvýraznit starší než (měsíců)",language:"Jazyk karty",lang_auto:"Podle integrace",auto_close:"Automaticky zavřít po nečinnosti (sekundy, prázdné = vypnuto)"},en:{freezer_id:"Freezer",name:"Name (optional)",icon:"Icon",display_mode:"Display mode",popup:"Tile with popup",list:"Inline list",touch_mode:"Tablet mode (larger elements)",show_count:"Show item count",show_weight:"Show weight",show_note:"Show note",sort:"Sorting",oldest_first:"Oldest first",newest_first:"Newest first",old_months:"Highlight older than (months)",language:"Card language",lang_auto:"Follow integration",auto_close:"Auto-close after inactivity (seconds, empty = off)"}};class qt extends at{constructor(){super(...arguments),this._config={type:""},this._freezers=[]}setConfig(t){this._config={...t}}connectedCallback(){super.connectedCallback(),xt(),this._loadFreezers()}async _loadFreezers(){if(this.hass)try{this._freezers=await async function(t){return(await t.callWS({type:`${zt}/get_freezers`})).freezers}(this.hass)}catch{this._freezers=[]}}get _t(){const t="cs"===this.hass?.locale?.language?"cs":"en";return jt[t]}_update(t){this._config={...this._config,...t};for(const[t,e]of Object.entries(this._config))void 0===e&&delete this._config[t];yt(this,"config-changed",{config:this._config})}render(){if(!this.hass)return F``;const t=this._t,e=this._config;return F`
      <div class="editor">
        <div class="field">
          <label>${t.freezer_id}</label>
          <select
            .value=${e.freezer_id??"main_freezer"}
            @change=${t=>this._update({freezer_id:t.target.value})}
          >
            ${(this._freezers.length?this._freezers:[{id:"main_freezer",name:"main_freezer"}]).map(t=>F`
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

        ${[["touch_mode",t.touch_mode],["show_count",t.show_count],["show_weight",t.show_weight],["show_note",t.show_note]].map(([t,e])=>F`
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
  `}}t([dt({attribute:!1})],qt.prototype,"hass",void 0),t([pt()],qt.prototype,"_config",void 0),t([pt()],qt.prototype,"_freezers",void 0),customElements.define("freezer-inventory-card-editor",qt);var Lt=Object.freeze({__proto__:null});
