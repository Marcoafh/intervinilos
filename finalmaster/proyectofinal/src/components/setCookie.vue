<!-- eslint-disable vue/multi-word-component-names -->
<!-- eslint-disable vue/no-export-in-script-setup -->
<script lang="ts">
import { Base64 } from 'js-base64';

function getUserData(): Object | undefined {

  const cookies = document.cookie.split("; ");//aacedo a las cookies
let userCookieValue = null;

for (const cookie of cookies) {
  const [cookieName, cookieValue] = cookie.split("=");
  if (cookieName === "user") {
    const decodedValue = Base64.decode(cookieValue);
    userCookieValue = JSON.parse(decodedValue);
    break;
  }
}

return userCookieValue;
}

export { getUserData }; 
</script>
