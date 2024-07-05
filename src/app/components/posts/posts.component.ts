import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { PostStore } from '../../store/post.state';

@Component({
  selector: 'sg-posts',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './posts.component.html',
  styleUrl: './posts.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [PostStore],
})
export class PostsComponent {
  private readonly fb = inject(FormBuilder);
  public readonly store = inject(PostStore);

  public form = this.fb.nonNullable.group({
    title: ['', [Validators.required]],
  });

  public onAdd(): void {
    const title: string = this.form.controls['title'].value;
    this.store.addPost(title);
    this.form.reset();
  }

  public removePost(id: number): void {
    this.store.removePost(id);
  }
}
