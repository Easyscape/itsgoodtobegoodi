import { siteConfig } from '@/lib/config/site'

export const metadata = {
  title: 'Mentions légales',
  description: 'Mentions légales du site It\'s Good To Be Goodi',
}

export default function MentionsLegalesPage() {
  return (
    <main className="min-h-screen bg-white">
      {/* Header */}
      <section className="bg-beige-50 py-16 md:py-20 border-b border-beige-200">
        <div className="max-w-3xl mx-auto px-6">
          <h1 className="font-serif text-3xl md:text-4xl font-bold text-brown-900">
            Mentions légales
          </h1>
        </div>
      </section>

      {/* Content */}
      <section className="py-12 md:py-16">
        <div className="max-w-3xl mx-auto px-6">
          <div className="prose prose-brown max-w-none">
            <h2>Éditeur du site</h2>
            <p>
              Le site <strong>{siteConfig.name}</strong> est édité par Laure Szumilas.
            </p>
            <p>
              <strong>Email :</strong> {siteConfig.email}
            </p>

            <h2>Hébergement</h2>
            <p>
              Ce site est hébergé par Vercel Inc.<br />
              440 N Barranca Ave #4133<br />
              Covina, CA 91723<br />
              États-Unis
            </p>

            <h2>Propriété intellectuelle</h2>
            <p>
              L&apos;ensemble du contenu de ce site (textes, images, vidéos, graphismes, logo, icônes)
              est la propriété exclusive de {siteConfig.name}, sauf mention contraire explicite.
            </p>
            <p>
              Toute reproduction, distribution, modification, adaptation, retransmission ou publication,
              même partielle, de ces différents éléments est strictement interdite sans l&apos;accord
              exprès par écrit de {siteConfig.name}.
            </p>

            <h2>Données personnelles</h2>
            <p>
              Conformément au Règlement Général sur la Protection des Données (RGPD), vous disposez
              d&apos;un droit d&apos;accès, de rectification et de suppression des données vous concernant.
            </p>
            <p>
              Pour exercer ce droit, vous pouvez nous contacter à l&apos;adresse : {siteConfig.email}
            </p>

            <h3>Données collectées</h3>
            <ul>
              <li><strong>Newsletter :</strong> email (stocké de manière sécurisée)</li>
              <li><strong>Commentaires :</strong> nom, email, contenu du commentaire</li>
              <li><strong>Compte membre :</strong> nom, email, mot de passe (crypté)</li>
            </ul>

            <h3>Cookies</h3>
            <p>
              Ce site utilise des cookies techniques nécessaires à son bon fonctionnement.
              Aucun cookie publicitaire n&apos;est utilisé.
            </p>

            <h2>Liens hypertextes</h2>
            <p>
              Ce site peut contenir des liens vers d&apos;autres sites. Nous ne sommes pas responsables
              du contenu de ces sites externes.
            </p>

            <h2>Contact</h2>
            <p>
              Pour toute question concernant ces mentions légales, vous pouvez nous contacter
              à l&apos;adresse : {siteConfig.email}
            </p>

            <p className="text-sm text-brown-500 mt-12">
              Dernière mise à jour : {new Date().toLocaleDateString('fr-FR', {
                day: 'numeric',
                month: 'long',
                year: 'numeric'
              })}
            </p>
          </div>
        </div>
      </section>
    </main>
  )
}
