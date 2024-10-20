import Image from "next/image";
import Link from "next/link";

export default function Page() {
  return (
    <div className="text-black  prose lg:prose-xl px-12 mx-auto my-48 bg-gray-300 p-12 relative z-[999999999] mb-[100vh]">
      <h1 className="text-4xl mb-12">Regulamin Strony Quixy</h1>
      <div className="text-black prose lg:prose-xl px-12 mx-auto my-48 bg-gray-300 p-12 relative z-[999999999] mb-[100vh]">
        <h1 className="text-4xl mb-12">Regulamin Strony Quixy</h1>
        <div>
          <div className="text-lg font-bold mt-6">1. Postanowienia ogólne</div>
          <br />
          1.1. Quixy to platforma internetowa umożliwiająca kontakt między
          klientami a „talentami” specjalizującymi się w pracy IT oraz pracy
          zdalnej.
          <br />
          1.2. Korzystając z platformy Quixy, użytkownik akceptuje wszystkie
          postanowienia niniejszego regulaminu.
        </div>
        <div>
          <div className="text-lg font-bold mt-6">2. Definicje</div>
          <br />
          2.1. Talent – osoba, która za pomocą platformy Quixy podejmuje
          zlecenia wybrane przez siebie od klientów. Talenty mogą być
          specjalistami z różnych dziedzin IT oraz pracy zdalnej.
          <br />
          2.2. Klient – osoba lub podmiot, który za pośrednictwem platformy
          Quixy dodaje nowe zlecenia do wykonania przez talenty oraz generuje
          pomysły na Głównym Panelu Użytkownika.
        </div>
        <div>
          <div className="text-lg font-bold mt-6">3. Zakres usług</div>
          <br />
          3.1. Quixy oferuje narzędzia ułatwiające kontakt między klientami a
          talentami, w tym generator pomysłów obsługiwany przez sztuczną
          inteligencję.
          <br />
          3.2. Quixy nie pośredniczy w transakcjach finansowych ani nie
          gwarantuje zawarcia umowy o współpracy między klientami a talentami.
        </div>
        <div>
          <div className="text-lg font-bold mt-6">4. Odpowiedzialność</div>
          <br />
          4.1. Quixy nie ponosi odpowiedzialności za jakiekolwiek szkody
          wynikające z zawarcia, wykonania lub braku wykonania współpracy między
          klientem a talentem.
          <br />
          4.2. Quixy nie odpowiada za straty finansowe, utracone korzyści, ani
          inne szkody poniesione przez użytkowników platformy.
          <br />
          4.3. Wszelkie roszczenia dotyczące współpracy pomiędzy klientem a
          talentem muszą być rozstrzygane bezpośrednio pomiędzy stronami.
        </div>
        <div>
          <div className="text-lg font-bold mt-6">
            5. Zasady korzystania z platformy
          </div>
          <br />
          5.1. Talenty korzystają z waluty Quixies, aby kontaktować się z
          klientami.
          <br />
          5.2. Waluta Quixies nie ma wartości pieniężnej poza platformą Quixy i
          nie podlega zwrotowi.
          <br />
          5.3. Quixy zastrzega sobie prawo do zawieszenia lub zakończenia konta
          użytkownika w przypadku naruszenia regulaminu.
        </div>
        <div>
          <div className="text-lg font-bold mt-6">6. Polityka prywatności</div>
          <br />
          6.1. Quixy dba o ochronę danych osobowych użytkowników zgodnie z
          obowiązującymi przepisami o ochronie danych osobowych.
          <br />
          6.2. Użytkownik przyjmuje do wiadomości, że korzystanie z platformy
          wiąże się z przetwarzaniem jego danych osobowych zgodnie z Polityką
          Prywatności Quixy.
        </div>
        <div>
          <div className="text-lg font-bold mt-6">
            7. Przetwarzanie danych osobowych
          </div>
          <br />
          7.1. Użytkownik wyraża zgodę na przetwarzanie danych osobowych, takich
          jak adres e-mail, imię, nazwę firmy, wielkość firmy, miasto
          działalności, województwo, a także opisy i obrazy projektów, w celu:
          <br />
          - umożliwienia kontaktu między Quixy, użytkownikami (klientami oraz
          talentami), zarówno drogą mailową, jak i przez inne środki
          komunikacji,
          <br />
          - wyświetlania na platformie w celu realizacji zadań i promocji
          projektów oraz uslug użytkownika.
          <br />
          7.2. Dane te mogą być używane wyłącznie w celach niezbędnych do
          funkcjonowania platformy, kontaktu z użytkownikami oraz realizacji
          usług oferowanych przez Quixy.
        </div>
        <div>
          <div className="text-lg font-bold mt-6">8. Ograniczenia prawne</div>
          <br />
          8.1. Quixy nie gwarantuje, że usługi platformy będą wolne od błędów
          lub dostępne w sposób ciągły.
          <br />
          8.2. Quixy nie ponosi odpowiedzialności za przerwy techniczne, błędy
          systemowe ani inne zakłócenia w działaniu platformy.
        </div>
        <div>
          <div className="text-lg font-bold mt-6">
            9. Własność intelektualna
          </div>
          <br />
          9.1. Wszelkie prawa do treści generowanych za pomocą narzędzi Quixy, w
          tym pomysłów stworzonych przez sztuczną inteligencję, przysługują
          użytkownikowi.
          <br />
          9.2. Quixy nie ponosi odpowiedzialności za naruszenie praw autorskich
          wynikające z użytkowania platformy.
        </div>
        <div>
          <div className="text-lg font-bold mt-6">10. Rozstrzyganie sporów</div>
          <br />
          10.1. W przypadku sporu pomiędzy użytkownikiem a Quixy, strony
          zobowiązują się do podjęcia prób polubownego rozwiązania sporu.
          <br />
          10.2. Wszelkie spory będą rozstrzygane przez sąd właściwy dla siedziby
          Quixy.
        </div>
        <div>
          <div className="text-lg font-bold mt-6">11. Zmiany regulaminu</div>
          <br />
          11.1. Quixy zastrzega sobie prawo do zmiany niniejszego regulaminu w
          dowolnym momencie.
          <br />
          11.2. Użytkownik zostanie poinformowany o zmianach regulaminu, a
          dalsze korzystanie z platformy będzie oznaczało akceptację nowych
          warunków.
        </div>
      </div>

      <div className="flex justify-between mt-12">
        <div className="flex flex-col">
          Pomoc Techniczna:
          <Link href="https://wesiudev.com">https://wesiudev.com</Link>
        </div>
        <Image
          src="/assets/quixy-logo.png"
          width={224}
          height={224}
          alt="Logo serwisu quixy.pl"
          className="w-16 h-auto"
        />
      </div>
    </div>
  );
}
