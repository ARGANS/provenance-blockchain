import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import NameForm from '../components/nameForm.js'
import { useEffect, useState } from 'react';
import { server } from '../config/config.js';
import {useSSE} from 'use-sse';


export default function Home() {

  const [myaddress, setMyaddress] = useState('');

  useEffect(() => {
    fetch(server + "/api/get/address")
    .then(response => response.json())
    .then(data => {
      setMyaddress(data.address);
    });
  }, [])

  return (
    <div>
      <Head>
        <title>Argans Provenance Proof of Concept</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <div>add software license here</div>

      <div>
The copyright notices in the Software and this entire statement, including
the above license grant, this restriction and the following disclaimer,
must be included in all copies of the Software, in whole or in part, and
all derivative works of the Software, unless such copies or derivative
works are solely in the form of machine-executable object code generated by
a source language processor.
      </div>

      <div>
THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE, TITLE AND NON-INFRINGEMENT. IN NO EVENT
SHALL THE COPYRIGHT HOLDERS OR ANYONE DISTRIBUTING THE SOFTWARE BE LIABLE
FOR ANY DAMAGES OR OTHER LIABILITY, WHETHER IN CONTRACT, TORT OR OTHERWISE,
ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER
DEALINGS IN THE SOFTWARE.
     </div>

    </div>
  );
}
